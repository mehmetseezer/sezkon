'use client';

import React from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination, Parallax } from 'swiper/modules';
import { ArrowRight } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

interface Slide {
  image: string;
  tag: string;
  title: React.ReactNode;
  desc: string;
  link?: string;
}

interface HeroCarouselProps {
  slides: Slide[];
  brandColor?: string;
  contactButtonText: string;
}

export default function HeroCarousel({
  slides,
  brandColor = '#007aff',
  contactButtonText,
}: HeroCarouselProps) {
  // Statik stil bloğu (sadece CSS değişkeni kullanır)
  const styleTagContent = `
    .hero-pagination .swiper-pagination-bullet {
      background: #cbd5e1 !important;
      opacity: 1 !important;
      width: 2rem !important;
      height: 3px !important;
      border-radius: 0 !important;
      transition: all 0.3s ease !important;
    }
    .hero-pagination .swiper-pagination-bullet-active {
      background: var(--brand-color, #007aff) !important;
      width: 3rem !important;
    }
    .swiper-fade .swiper-slide {
      transition-property: opacity;
    }
    .swiper-fade .swiper-slide-active {
      opacity: 1;
    }
    .swiper-fade .swiper-slide-next,
    .swiper-fade .swiper-slide-prev {
      opacity: 0;
      z-index: 10;
    }
    [data-swiper-parallax] {
      transition: transform 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1);
    }
  `;

  return (
    <section
      className="relative w-full overflow-hidden bg-white"
      style={{ '--brand-color': brandColor } as React.CSSProperties}
    >
      <style dangerouslySetInnerHTML={{ __html: styleTagContent }} />
      <Swiper
        modules={[Autoplay, EffectFade, Pagination, Parallax]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={1000}
        parallax={true}
        loop={true}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{
          clickable: true,
          el: '.hero-pagination',
          renderBullet: (index, className) => {
            return `<span class="${className} w-10 h-[3px] !rounded-none transition-all duration-500 cursor-pointer"></span>`;
          },
        }}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative min-h-screen w-full">
              <div className="mx-auto flex min-h-screen w-full max-w-7xl items-center px-6 py-16 md:px-8 lg:px-12">
                <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
                  {/* Sol: Metin */}
                  <div className="order-2 text-center lg:order-1 lg:text-left">
                    <div
                      className="mb-6 inline-block rounded-full bg-indigo-50/80 px-5 py-2 text-[13px] font-semibold tracking-tight text-indigo-600 backdrop-blur-sm"
                      data-swiper-parallax="-100"
                    >
                      {slide.tag}
                    </div>

                    <h1
                      className="mb-6 text-4xl font-bold leading-[1.1] tracking-tighter text-gray-900 md:text-6xl lg:text-7xl"
                      data-swiper-parallax="-200"
                    >
                      {slide.title}
                    </h1>

                    <p
                      className="mb-10 text-lg font-medium leading-relaxed text-gray-500 md:text-xl"
                      data-swiper-parallax="-300"
                    >
                      {slide.desc}
                    </p>

                    <div
                      className="flex flex-col items-center gap-6 sm:flex-row lg:justify-start"
                      data-swiper-parallax="-400"
                    >
                      <Link
                        href={slide.link || '/iletisim'}
                        className="rounded-full px-8 py-3 text-[17px] font-semibold text-white shadow-md transition-all hover:shadow-lg"
                        style={{ backgroundColor: brandColor }}
                      >
                        {contactButtonText}
                      </Link>
                    </div>
                  </div>

                  {/* Sağ: Kare Görsel */}
                  <div className="order-1 flex items-center justify-center lg:order-2">
                    <div className="relative w-full max-w-md lg:max-w-xl">
                      <div className="group relative overflow-hidden rounded-2xl bg-neutral-100 shadow-xl transition-all duration-500 hover:shadow-2xl">
                        <div className="relative aspect-square w-full">
                          <Image
                            src={slide.image}
                            alt={slide.tag}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            priority={index === 0}
                            sizes="(max-width: 768px) 100vw, 50vw"
                          // quality prop'u kaldırıldı
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="hero-pagination absolute bottom-8 left-1/2 z-50 flex -translate-x-1/2 gap-2" />
      </Swiper>
    </section>
  );
}