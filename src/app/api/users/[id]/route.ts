// app/api/users/[id]/route.ts
import { getUserById } from '@/app/lib/DB/db';
import { NextResponse } from 'next/server';

// GET /api/users/[id] - Get user by ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const userId = parseInt(params.id);
  const user = await getUserById(userId);

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json(user);
}
