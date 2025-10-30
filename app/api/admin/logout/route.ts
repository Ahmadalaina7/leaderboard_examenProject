import { NextResponse } from 'next/server';
import cookie from 'cookie';

export async function POST() {
  const serialized = cookie.serialize('escape_admin', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0
  });

  return new NextResponse(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      'Set-Cookie': serialized,
      'Content-Type': 'application/json'
    }
  });
}
