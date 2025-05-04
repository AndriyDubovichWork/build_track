// app/api/rooms/route.ts
import { createRoom, getRoomsByCompany } from '@/app/lib/DB/db';
import { NextRequest, NextResponse } from 'next/server';

// POST /api/rooms - Create a new room
export async function POST(request: NextRequest) {
  const roomData = await request.json();
  const result = await createRoom(roomData);

  if ('error' in result) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json(result, { status: 201 });
}

// GET /api/rooms?companyId=123 - Get rooms by company
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const companyId = searchParams.get('companyId');

  if (!companyId) {
    return NextResponse.json(
      { error: 'companyId query parameter is required' },
      { status: 400 }
    );
  }

  const result = await getRoomsByCompany(parseInt(companyId));

  if ('error' in result) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json(result);
}
