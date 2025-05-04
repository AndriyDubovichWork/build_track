// components/DetailCard.tsx
import { ReactNode } from 'react';

interface DetailCardProps {
  children: ReactNode;
}

export const DetailCard = ({ children }: DetailCardProps) => {
  return (
    <div className='bg-white rounded-xl shadow-md p-6 space-y-4'>
      {children}
    </div>
  );
};
