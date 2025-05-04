// app/api/companies/route.ts
import { createCompany, getAllCompanies } from '@/app/lib/DB/db';
import { NextResponse } from 'next/server';

// GET /api/companies - Get all companies
export async function GET() {
  const result = await getAllCompanies();

  if ('error' in result) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json(result);
}

// POST /api/companies - Create a new company
export async function POST(request: Request) {
  const companyData = await request.json();
  const result = await createCompany(companyData);

  if ('error' in result) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json(result, { status: 201 });
}
