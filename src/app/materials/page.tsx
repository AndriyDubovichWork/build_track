'use client';

import { useSearchParams } from 'next/navigation';

export default function Materials() {
  const searchParams = useSearchParams();

  const id = searchParams.get('id');

  const resExample = {
    id: id,
    name: 'Кімната 1',
    location: 'Київ',
    start_date: '2025-05-01',
    deadline_date: '2025-06-15',
  };

  return (
    <main className='max-w-2xl mx-auto p-6 bg-gray-50 min-h-screen'>
      <div className='flex space-x-4 mb-8'>
        <a
          href={`/?id=${id}`}
          className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-green-600 transition-colors'
        >
          Main
        </a>
        <a
          href={`/tasks?id=${id}`}
          className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-green-600 transition-colors'
        >
          Tasks
        </a>
      </div>

      <div className='bg-white rounded-xl shadow-md p-6 space-y-4'>
        <div className='border-b pb-2'>
          <span className='text-sm font-medium text-gray-500'>ID</span>
          <h1 className='text-2xl font-bold text-gray-800'>{resExample.id}</h1>
        </div>

        <div className='border-b pb-2'>
          <span className='text-sm font-medium text-gray-500'>Name</span>
          <h1 className='text-3xl font-bold text-blue-600'>
            {resExample.name}
          </h1>
        </div>

        <div className='border-b pb-2'>
          <span className='text-sm font-medium text-gray-500'>Location</span>
          <h3 className='text-xl font-semibold text-gray-700'>
            {resExample.location}
          </h3>
        </div>

        <div className='grid grid-cols-2 gap-4'>
          <div>
            <span className='text-sm font-medium text-gray-500'>
              Start Date
            </span>
            <h4 className='text-lg font-medium text-gray-800'>
              {resExample.start_date}
            </h4>
          </div>
          <div>
            <span className='text-sm font-medium text-gray-500'>Deadline</span>
            <h4 className='text-lg font-medium text-red-600'>
              {resExample.deadline_date}
            </h4>
          </div>
        </div>
      </div>
    </main>
  );
}
