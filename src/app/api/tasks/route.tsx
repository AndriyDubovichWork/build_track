// app/api/tasks/route.ts
import { createTask, getTasksByRoom } from '@/app/lib/DB/db';
import { NextResponse } from 'next/server';

// POST /api/tasks - Create a new task
export async function POST(request: NextRequest) {
  const taskData = await request.json();
  const result = await createTask(taskData);

  if ('error' in result) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json(result, { status: 201 });
}

// GET /api/tasks?roomId=123 - Get tasks by room
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const roomId = searchParams.get('roomId');

  if (!roomId) {
    return NextResponse.json(
      { error: 'roomId query parameter is required' },
      { status: 400 }
    );
  }

  const result = await getTasksByRoom(parseInt(roomId));

  if ('error' in result) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json(result);
}
