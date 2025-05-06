'use client';

import { useSearchParams } from 'next/navigation';
import { NavButtons } from '../Components/Layout/NavButtons';
import { DetailCard } from '../Components/Layout/DetailCard';
import { DetailSection } from '../Components/Layout/DetailSection';

export default function MaterialsPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') || '1';

  const materials = [
    {
      id: 1,
      name: 'Цемент',
      unit_price: 150.0,
      quantity: 10,
      total_price: 1500.0,
      comment: 'Для підлоги',
    },
    {
      id: 2,
      name: 'Пісок',
      unit_price: 50.0,
      quantity: 20,
      total_price: 1000.0,
      comment: 'Для розчину',
    },
  ];

  return (
    <>
      <NavButtons activeTab='materials' />

      <h1 className='text-3xl font-bold text-gray-800 mb-6'>
        Materials for Project: <span className='text-orange-500'>{id}</span>
      </h1>

      <div className='space-y-4'>
        {materials.map((material) => (
          <DetailCard key={material.id}>
            <DetailSection
              label='Material Name'
              value={material.name}
              valueSize='xl'
              valueColor='orange-500'
            />

            <div className='grid grid-cols-3 gap-4 mt-4'>
              <DetailSection
                label='Unit Price'
                value={`${material.unit_price} ₴`}
                valueSize='lg'
              />
              <DetailSection
                label='Quantity'
                value={material.quantity}
                valueSize='lg'
              />
              <DetailSection
                label='Total Price'
                value={`${material.total_price} ₴`}
              />
            </div>

            {material.comment && (
              <DetailSection label='Comment' value={material.comment} />
            )}
          </DetailCard>
        ))}
      </div>
    </>
  );
}
