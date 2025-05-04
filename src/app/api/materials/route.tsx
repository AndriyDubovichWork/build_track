import { NextResponse } from 'next/server';

export function GET() {
  // request: NextRequest
  // const url = new URL(request.url);
  // const searchParams = new URLSearchParams(url.search);
  // const id =  searchParams.get('id') || 1;

  const MaterialExample = [
    {
      name: 'Цемент',
      unit_price: 150.0,
      quantity: 10,
      total_price: 1500.0,
      comment: 'Для підлоги',
    },
  ];
  return NextResponse.json(MaterialExample);
}
