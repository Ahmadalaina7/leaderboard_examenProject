import { NextResponse } from 'next/server';
import cookie from 'cookie';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { password } = data;

    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    // ✅ Maak cookie aan
    const serialized = cookie.serialize('escape_admin', password, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 // 1 dag geldig
    });

    return new NextResponse(JSON.stringify({ ok: true }), {
      status: 200,
      headers: {
        'Set-Cookie': serialized,
        'Content-Type': 'application/json'
      }
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
