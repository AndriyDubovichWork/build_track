// components/DetailSection.tsx
import { ReactNode } from 'react';

type TextSize = 'lg' | 'xl' | '2xl' | '3xl';
type TextColor = 'gray-700' | 'gray-800' | 'blue-600' | 'red-600';

interface DetailSectionProps {
  label: string;
  value: ReactNode;
  valueSize?: TextSize;
  valueColor?: TextColor;
}

export const DetailSection = ({
  label,
  value,
  valueSize = '2xl',
  valueColor = 'gray-800',
}: DetailSectionProps) => {
  return (
    <div className='border-b pb-2'>
      <span className='text-sm font-medium text-gray-500'>{label}</span>
      <h1 className={`text-${valueSize} font-bold text-${valueColor}`}>
        {value}
      </h1>
    </div>
  );
};
