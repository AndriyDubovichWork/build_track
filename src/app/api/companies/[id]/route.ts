// app/api/companies/[id]/route.ts
import { getCompanyById } from '@/app/lib/DB/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const companyId = parseInt(context.params.id);
  const company = await getCompanyById(companyId);

  if (!company) {
    return NextResponse.json({ error: 'Company not found' }, { status: 404 });
  }

  return NextResponse.json(company);
}
