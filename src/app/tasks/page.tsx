'use client';

import { useSearchParams } from 'next/navigation';

export default function Materials() {
  const searchParams = useSearchParams();

  const id = searchParams.get('id');

  const TasksExample = [
    {
      id: 1,
      name: 'Укладання плитки',
      status: 'done',
      description: 'Плитка в ванній кімнаті',
      photos: ['url1.jpg', 'url2.jpg'],
      comments: [
        { user: 'Іван', text: 'Зроблено!', created_at: '2025-05-02 10:12' },
      ],
    },
    {
      id: 2,
      name: 'Поклейка шпалер',
      status: 'done',
      description: 'Шпалери в коридорі',
      photos: ['url1.jpg', 'url2.jpg'],
      comments: [
        { user: 'Іван', text: 'Зроблено!', created_at: '2025-05-02 12:12' },
      ],
    },
  ];

  return (
    <main className='max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen'>
      <div className='flex space-x-4 mb-8'>
        <a
          href={`/?id=${id}`}
          className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-green-600 transition-colors'
        >
          Main
        </a>
        <a
          href={`/materials?id=${id}`}
          className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-green-600 transition-colors'
        >
          Materials
        </a>
      </div>

      <h1 className='text-3xl font-bold text-gray-800 mb-6'>
        Tasks for Project: <span className='text-blue-600'>{id}</span>
      </h1>

      <div className='space-y-4'>
        {TasksExample.map((task) => (
          <div
            key={task.id}
            className='bg-white rounded-xl shadow-md overflow-hidden border-l-4 border-green-500'
          >
            <div className='p-6'>
              <div className='flex justify-between items-start'>
                <div>
                  <h2 className='text-xl font-bold text-gray-800'>
                    {task.name}
                  </h2>
                  <div className='flex items-center mt-1'>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        task.status === 'done'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {task.status === 'done' ? 'Completed' : 'In Progress'}
                    </span>
                  </div>
                </div>
                <span className='text-sm text-gray-500'>Task #{task.id}</span>
              </div>

              <p className='mt-3 text-gray-600'>{task.description}</p>

              {task.photos.length > 0 && (
                <div className='mt-4'>
                  <h4 className='text-sm font-medium text-gray-500 mb-2'>
                    Photos:
                  </h4>
                  <div className='flex space-x-2'>
                    {task.photos.map((photo, index) => (
                      <div
                        key={index}
                        className='w-20 h-20 bg-gray-200 rounded-md flex items-center justify-center'
                      >
                        <span className='text-xs text-gray-500'>
                          Photo {index + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {task.comments.length > 0 && (
                <div className='mt-6'>
                  <h4 className='text-sm font-medium text-gray-500 mb-2'>
                    Comments:
                  </h4>
                  <div className='space-y-3'>
                    {task.comments.map((comment, index) => (
                      <div key={index} className='bg-gray-50 p-3 rounded-lg'>
                        <div className='flex justify-between items-center'>
                          <span className='font-medium text-gray-800'>
                            {comment.user}
                          </span>
                          <span className='text-xs text-gray-500'>
                            {comment.created_at}
                          </span>
                        </div>
                        <p className='mt-1 text-gray-700'>{comment.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
