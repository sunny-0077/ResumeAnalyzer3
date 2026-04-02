import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  // Use Vercel x-vercel-ip-country header (standard for Vercel/Next.js)
  // Fallback to 'IN' for development/localhost testing
  const country = req.headers.get('x-vercel-ip-country') || 'IN';
  
  return NextResponse.json({ country });
}
