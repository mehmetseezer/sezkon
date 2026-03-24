// components/ui/Container.tsx
import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export const Container = ({
  children,
  className = '',
  as: Component = 'div',
}: ContainerProps) => {
  return (
    <Component className={`container mx-auto px-6 ${className}`}>
      {children}
    </Component>
  );
};