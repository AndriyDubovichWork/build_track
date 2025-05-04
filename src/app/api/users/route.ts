// app/api/users/route.ts
import { createUser } from '@/app/lib/DB/db';
import { NextRequest, NextResponse } from 'next/server';

// POST /api/users - Create a new user
export async function POST(request: NextRequest) {
  const userData = await request.json();
  const result = await createUser(userData);

  if ('error' in result) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json(result, { status: 201 });
}
