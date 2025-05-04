// app/api/rooms/[id]/route.ts
import { getRoomWithDetails } from '@/app/lib/DB/db';
import { NextResponse } from 'next/server';

// GET /api/rooms/[id] - Get room details with company, user and tasks
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const roomId = parseInt(params.id);
  const result = await getRoomWithDetails(roomId);

  if (!result) {
    return NextResponse.json({ error: 'Room not found' }, { status: 404 });
  }

  if ('error' in result) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json(result);
}
