import { NextResponse } from 'next/server';
import { getDb } from '@/db/db';
import { cookies } from 'next/headers';

const ADMIN_COOKIE = 'escape_admin';

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  // ✅ eerst de id ophalen
  const { id } = await context.params;

  // ✅ cookies ophalen (zonder await)
  const cookieStore = cookies();
  const val = (await cookieStore).get(ADMIN_COOKIE)?.value;

  // ✅ check of admin is ingelogd
  if (!val || val !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const db = await getDb();
    await db.run('DELETE FROM scores WHERE id = ?', id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Database error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
