// src/app/api/users/[id]/route.ts
import { getUserById } from '@/app/lib/DB/db';
import { NextRequest, NextResponse } from 'next/server';

// GET /api/users/[id] - Get user by ID
export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  // Await params before accessing
  const { id } = await context.params;

  const userId = parseInt(id);
  const user = await getUserById(userId);

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json(user);
}
