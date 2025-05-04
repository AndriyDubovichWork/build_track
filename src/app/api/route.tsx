import { NextResponse } from 'next/server';

export function GET(request: Request) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const id = searchParams.get('id') || 1;

  const resExample = {
    id: id,
    name: 'Кімната 1',
    location: 'Київ',
    start_date: '2025-05-01',
    deadline_date: '2025-06-15',
  };

  return NextResponse.json(resExample);
}
