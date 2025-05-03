import { NextResponse } from 'next/server';

export function GET() {
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

  return NextResponse.json(TasksExample);
}
