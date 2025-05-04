'use client';
import { useSearchParams } from 'next/navigation';
import { DetailCard } from './Components/Layout/DetailCard';
import { DetailSection } from './Components/Layout/DetailSection';
import { NavButtons } from './Components/Layout/NavButtons';
import { Project } from './types';

export default function MainPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') || '1';

  const project: Project = {
    id: id,
    name: 'house Project',
    location: 'Kyiv',
    start_date: '2023-01-01',
    deadline_date: '2023-12-31',
  };

  return (
    <>
      <NavButtons id={id} activeTab='main' />
      <DetailCard>
        <DetailSection label='ID' value={project.id} />
        <DetailSection
          label='Name'
          value={project.name}
          valueSize='3xl'
          valueColor='blue-600'
        />
        <DetailSection
          label='Location'
          value={project.location}
          valueSize='xl'
          valueColor='gray-700'
        />
        <div className='grid grid-cols-2 gap-4'>
          <DetailSection
            label='Start Date'
            value={project.start_date}
            valueSize='lg'
          />
          <DetailSection
            label='Deadline'
            value={project.deadline_date}
            valueSize='lg'
            valueColor='red-600'
          />
        </div>
      </DetailCard>
    </>
  );
}
