// src/app/api/companies/[id]/route.ts
import { getCompanyById } from '@/app/lib/DB/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  // Directly access params (no await needed)
  const { id } = await context.params;

  const companyId = parseInt(id);
  if (isNaN(companyId)) {
    return NextResponse.json({ error: 'Invalid company ID' }, { status: 400 });
  }

  const company = await getCompanyById(companyId);

  if (!company) {
    return NextResponse.json({ error: 'Company not found' }, { status: 404 });
  }

  return NextResponse.json(company);
}
