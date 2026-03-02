import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = ({ cookies, redirect }) => {
  cookies.delete('vt-session', { path: '/' });
  return redirect('/login', 302);
};
