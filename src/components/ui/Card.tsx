// components/ui/Card.tsx
import { Link } from '@/i18n/routing';
import Image from 'next/image';

interface CardProps {
  image?: string;
  title: string;
  description: string;
  link?: string;
  tag?: string;
}

export const Card = ({ image, title, description, link, tag }: CardProps) => {
  const content = (
    <div className="group relative bg-white/70 backdrop-blur-sm rounded-3xl p-6 transition-all duration-500 hover:shadow-2xl hover:bg-white/90 border border-gray-100 hover:border-indigo-200 h-full flex flex-col">
      {image && (
        <div className="relative h-48 mb-4 rounded-xl overflow-hidden">
          <Image src={image} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
      )}
      {tag && <span className="text-sm font-medium text-indigo-600 mb-2">{tag}</span>}
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 leading-relaxed text-sm flex-grow">{description}</p>
      {link && (
        <Link href={link} className="mt-4 text-indigo-600 font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
          Detaylar →
        </Link>
      )}
    </div>
  );

  return link ? <Link href={link}>{content}</Link> : content;
};