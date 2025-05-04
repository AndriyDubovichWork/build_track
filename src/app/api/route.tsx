import { NextRequest, NextResponse } from 'next/server';
// import { initializeDatabase } from '../lib/DB/initDb';

export async function GET(request: NextRequest) {
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
