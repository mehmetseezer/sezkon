export interface SEOAnalysisResult {
  score: number;
  checklist: Array<{
    id: string;
    label: string;
    status: 'success' | 'warning' | 'error';
    feedback: string;
  }>;
}

export function analyzeSEO(blog: {
  title: string;
  content: string;
  excerpt: string;
  seo_title: string | null;
  seo_description: string | null;
  focus_keyword: string | null;
}): SEOAnalysisResult {
  const { title, content, excerpt, seo_title, seo_description, focus_keyword } = blog;
  const finalSeoTitle = seo_title || title || '';
  const finalSeoDesc = seo_description || excerpt || '';
  const plainText = content ? content.replace(/<[^>]*>/g, '') : '';
  const wordCount = plainText.trim() === '' ? 0 : plainText.trim().split(/\s+/).length;

  if (!focus_keyword) {
    return {
      score: 0,
      checklist: [
        {
          id: 'keyword-missing',
          label: 'Odak anahtar kelime eksik',
          status: 'warning',
          feedback: 'SEO analizi yapabilmek için lütfen odak anahtar kelime girin.',
        },
      ],
    };
  }

  const checklist: SEOAnalysisResult['checklist'] = [];
  const kw = focus_keyword.toLowerCase();

  // 1. Focus Keyword in Title
  const titleMatch = title ? title.toLowerCase().includes(kw) : false;
  checklist.push({
    id: 'kw-title',
    label: 'Başlıkta Anahtar Kelime',
    status: titleMatch ? 'success' : 'error',
    feedback: titleMatch
      ? 'Anahtar kelime ana başlıkta bulunuyor.'
      : 'Odak anahtar kelimeniz ana başlıkta geçmiyor.',
  });

  // 2. Focus Keyword in SEO Description
  const descMatch = finalSeoDesc.toLowerCase().includes(kw);
  checklist.push({
    id: 'kw-desc',
    label: 'Meta Açıklamasında Anahtar Kelime',
    status: descMatch ? 'success' : 'error',
    feedback: descMatch
      ? 'Anahtar kelime meta açıklamasında bulunuyor.'
      : 'Odak anahtar kelimeniz meta açıklamasında geçmiyor.',
  });

  // 3. Focus Keyword in first paragraph
  const firstParagraph = content ? (content.match(/<p>(.*?)<\/p>/)?.[1] || '') : '';
  const firstParagraphMatch = firstParagraph.toLowerCase().includes(kw);
  checklist.push({
    id: 'kw-first-para',
    label: 'İlk Paragrafta Anahtar Kelime',
    status: firstParagraphMatch ? 'success' : 'warning',
    feedback: firstParagraphMatch
      ? 'Anahtar kelime makalenin ilk paragrafında yer alıyor.'
      : 'Anahtar kelime ilk paragrafta geçmiyor, giriş paragrafında kullanılması tavsiye edilir.',
  });

  // 4. Keyword density
  const kwCount = plainText.toLowerCase().split(kw).length - 1;
  const kwDensity = wordCount > 0 ? (kwCount / wordCount) * 100 : 0;
  let densityStatus: 'success' | 'warning' | 'error' = 'success';
  let densityFeedback = `Anahtar kelime yoğunluğu %${kwDensity.toFixed(2)} (${kwCount} kez). Bu oran ideal.`;

  if (kwDensity === 0) {
    densityStatus = 'error';
    densityFeedback = 'Odak anahtar kelime makale gövdesinde hiç bulunamadı.';
  } else if (kwDensity < 0.5) {
    densityStatus = 'warning';
    densityFeedback = `Anahtar kelime yoğunluğu %${kwDensity.toFixed(2)} çok düşük. Daha fazla kullanın.`;
  } else if (kwDensity > 2.5) {
    densityStatus = 'warning';
    densityFeedback = `Anahtar kelime yoğunluğu %${kwDensity.toFixed(2)} çok yüksek (%2.5'ten az olması önerilir).`;
  }
  checklist.push({
    id: 'kw-density',
    label: 'Anahtar Kelime Yoğunluğu',
    status: densityStatus,
    feedback: densityFeedback,
  });

  // 5. Title Length (40-60 optimal)
  const titleLen = finalSeoTitle.length;
  let titleStatus: 'success' | 'warning' | 'error' = 'success';
  let titleFeedback = `SEO başlık uzunluğu (${titleLen} karakter) ideal aralıkta.`;
  if (titleLen === 0) {
    titleStatus = 'error';
    titleFeedback = 'SEO Başlığı girilmemiş veya boş.';
  } else if (titleLen < 40) {
    titleStatus = 'warning';
    titleFeedback = `SEO başlığı çok kısa (${titleLen} karakter). En az 40 karakter önerilir.`;
  } else if (titleLen > 65) {
    titleStatus = 'warning';
    titleFeedback = `SEO başlığı çok uzun (${titleLen} karakter). 65 karakterden az olması önerilir.`;
  }
  checklist.push({
    id: 'title-len',
    label: 'SEO Başlık Uzunluğu',
    status: titleStatus,
    feedback: titleFeedback,
  });

  // 6. Meta Description Length (110-160 optimal)
  const descLen = finalSeoDesc.length;
  let descStatus: 'success' | 'warning' | 'error' = 'success';
  let descFeedback = `Meta açıklama uzunluğu (${descLen} karakter) ideal aralıkta.`;
  if (descLen === 0) {
    descStatus = 'error';
    descFeedback = 'Meta açıklaması girilmemiş veya boş.';
  } else if (descLen < 110) {
    descStatus = 'warning';
    descFeedback = `Meta açıklaması çok kısa (${descLen} karakter). En az 110 karakter önerilir.`;
  } else if (descLen > 165) {
    descStatus = 'warning';
    descFeedback = `Meta açıklaması çok uzun (${descLen} karakter). 165 karakterden az olması önerilir.`;
  }
  checklist.push({
    id: 'desc-len',
    label: 'Meta Açıklama Uzunluğu',
    status: descStatus,
    feedback: descFeedback,
  });

  // 7. Word count
  let wordStatus: 'success' | 'warning' | 'error' = 'success';
  let wordFeedback = `Kelime sayısı: ${wordCount}. Yazınız uzunluk olarak zengin.`;
  if (wordCount === 0) {
    wordStatus = 'error';
    wordFeedback = 'Lütfen blog içeriği yazmaya başlayın.';
  } else if (wordCount < 300) {
    wordStatus = 'warning';
    wordFeedback = `Kelime sayısı (${wordCount}) yetersiz. Arama motorları için en az 300 kelime yazmanız önerilir.`;
  }
  checklist.push({
    id: 'word-count',
    label: 'Kelime Sayısı',
    status: wordStatus,
    feedback: wordFeedback,
  });

  // 8. Headings check
  const hasHeadings = content ? (content.includes('<h2') || content.includes('<h3')) : false;
  checklist.push({
    id: 'has-headings',
    label: 'Alt Başlık Kullanımı (H2/H3)',
    status: hasHeadings ? 'success' : 'warning',
    feedback: hasHeadings
      ? 'İçerikte alt başlıklar (H2, H3) kullanılmış.'
      : 'İçerikte H2 veya H3 bulunmuyor. Okunabilirliği ve SEOyu artırmak için alt başlıklar kullanın.',
  });

  // 9. Images with Alt text check
  const imageTags = content ? (content.match(/<img[^>]+>/g) || []) : [];
  const hasImages = imageTags.length > 0;
  const missingAlt = imageTags.some((img) => !img.includes('alt=') || img.includes('alt=""') || img.includes('alt=\'\''));
  let imgStatus: 'success' | 'warning' | 'error' = 'success';
  let imgFeedback = 'İçerikte görseller bulunuyor ve hepsinde SEO alt açıklamaları tanımlanmış.';

  if (!hasImages) {
    imgStatus = 'warning';
    imgFeedback = 'İçerikte görsel bulunmuyor. Arama motorları ve kullanıcılar için en az 1 görsel ekleyin.';
  } else if (missingAlt) {
    imgStatus = 'error';
    imgFeedback = 'Eklediğiniz bazı görsellerde alternatif metin (alt text) eksik. Bu SEO için kritik bir eksiktir.';
  }
  checklist.push({
    id: 'img-alt',
    label: 'Görsel Alt Etiketleri (Alt Text)',
    status: imgStatus,
    feedback: imgFeedback,
  });

  // Compute overall score
  const successCount = checklist.filter((item) => item.status === 'success').length;
  const totalCount = checklist.length;
  const score = Math.round((successCount / totalCount) * 100);

  return { score, checklist };
}
