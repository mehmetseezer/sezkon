// components/ui/SectionHeading.tsx
import React from 'react';

interface SectionHeadingProps {
  badge?: string;
  title?: string;
  highlight?: string;
  description?: string;
  className?: string;
}

export const SectionHeading = ({
  badge,
  title,
  highlight,
  description,
  className = '',
}: SectionHeadingProps) => {
  return (
    <div className={`text-center max-w-3xl mx-auto mb-16 space-y-4 ${className}`}>
      {badge && (
        <div className="inline-flex items-center rounded-full bg-indigo-50 px-4 py-1 text-sm font-semibold text-indigo-600 italic">
          {badge}
        </div>
      )}
      <h2 className="text-4xl lg:text-6xl font-black tracking-tighter text-gray-900 leading-[1.1]">
        {title}{' '}
        {highlight && (
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            {highlight}
          </span>
        )}
      </h2>
      {description && (
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">{description}</p>
      )}
    </div>
  );
};