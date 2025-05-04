'use client';

import { useSearchParams } from 'next/navigation';
import { NavButtons } from '../Components/Layout/NavButtons';
import { TaskCard } from '../Components/Layout/TaskCard';

export default function TasksPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') || '1';

  const tasks = [
    {
      id: 1,
      name: 'Укладання плитки',
      status: 'done' as const,
      description: 'Плитка в ванній кімнаті',
      photos: [
        { id: '1', url: 'url1.jpg' },
        { id: '2', url: 'url2.jpg' },
      ],
      comments: [
        {
          id: '1',
          user: 'Іван',
          text: 'Зроблено!',
          created_at: '2025-05-02 10:12',
        },
      ],
    },
    {
      id: 2,
      name: 'Поклейка шпалер',
      status: 'done' as const,
      description: 'Шпалери в коридорі',
      photos: [
        { id: '3', url: 'url1.jpg' },
        { id: '4', url: 'url2.jpg' },
      ],
      comments: [
        {
          id: '2',
          user: 'Іван',
          text: 'Зроблено!',
          created_at: '2025-05-02 12:12',
        },
      ],
    },
  ];

  return (
    <>
      <NavButtons id={id} activeTab='tasks' />

      <h1 className='text-3xl font-bold text-gray-800 mb-6'>
        Tasks for Project: <span className='text-blue-600'>{id}</span>
      </h1>

      <div className='space-y-4'>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </>
  );
}
