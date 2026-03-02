import type { APIRoute } from 'astro';
import { createSessionToken } from '../../lib/auth';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const data = await request.formData();
  const username = data.get('username')?.toString();
  const password = data.get('password')?.toString();

  if (
    username === import.meta.env.ADMIN_USERNAME &&
    password === import.meta.env.ADMIN_PASSWORD
  ) {
    cookies.set('vt-session', createSessionToken(), {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });
    return redirect('/admin', 302);
  }

  return redirect('/login?error=1', 302);
};
