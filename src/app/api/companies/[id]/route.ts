// app/api/companies/[id]/route.ts
import { getCompanyById } from '@/app/lib/DB/db';
import { NextRequest, NextResponse } from 'next/server';

// Handle GET request for /api/companies/[id]
export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const companyId = parseInt(context.params.id);
  if (isNaN(companyId)) {
    return NextResponse.json({ error: 'Invalid company ID' }, { status: 400 });
  }

  const company = await getCompanyById(companyId);

  if (!company) {
    return NextResponse.json({ error: 'Company not found' }, { status: 404 });
  }

  return NextResponse.json(company);
}
