// app/api/companies/[id]/route.ts
import { getCompanyById } from '@/app/lib/DB/db';
import { NextResponse } from 'next/server';

// GET /api/companies/[id] - Get company by ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const companyId = parseInt(params.id);
  const company = await getCompanyById(companyId);

  if (!company) {
    return NextResponse.json({ error: 'Company not found' }, { status: 404 });
  }

  return NextResponse.json(company);
}
