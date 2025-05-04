// app/api/companies/[id]/route.ts
import { getCompanyById } from '@/app/lib/DB/db';
import { NextRequest, NextResponse } from 'next/server';

export default async function handler(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const method = request.method;

  switch (method) {
    case 'GET':
      return handleGetCompany(context.params.id);

    default:
      return NextResponse.json(
        { error: `Method ${method} not allowed` },
        { status: 405 }
      );
  }
}

async function handleGetCompany(id: string) {
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
