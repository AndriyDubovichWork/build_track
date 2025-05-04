// src/app/api/rooms/[id]/route.ts
import { getRoomWithDetails } from '@/app/lib/DB/db';
import { NextRequest, NextResponse } from 'next/server';

// GET /api/rooms/[id] - Get room details with company, user, and tasks
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  // Await params before accessing them
  const { id } = await context.params;

  const roomId = parseInt(id);
  if (isNaN(roomId)) {
    return NextResponse.json({ error: 'Invalid room ID' }, { status: 400 });
  }

  const result = await getRoomWithDetails(roomId);

  if (!result) {
    return NextResponse.json({ error: 'Room not found' }, { status: 404 });
  }

  if ('error' in result) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json(result);
}
