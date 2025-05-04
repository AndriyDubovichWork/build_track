// app/api/tasks/[id]/route.ts
import { updateTaskStatus } from '@/app/lib/DB/db';
import { NextResponse } from 'next/server';

// PATCH /api/tasks/[id] - Update task status
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const taskId = parseInt(params.id);
  const { status } = await request.json();

  if (!status || !['done', 'in process'].includes(status)) {
    return NextResponse.json(
      { error: 'Valid status is required ("done" or "in process")' },
      { status: 400 }
    );
  }

  const result = await updateTaskStatus(
    taskId,
    status as 'done' | 'in process'
  );

  if ('error' in result) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json(result);
}
