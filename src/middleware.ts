import { defineMiddleware } from 'astro:middleware';
import { verifySessionToken } from './lib/auth';

export const onRequest = defineMiddleware((context, next) => {
  const { pathname } = new URL(context.request.url);

  if (pathname.startsWith('/admin')) {
    const session = context.cookies.get('vt-session')?.value;
    if (!session || !verifySessionToken(session)) {
      return context.redirect('/login');
    }
  }

  return next();
});
