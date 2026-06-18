import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isLoginPage = pathname === '/login';
  const isAdminLoginPage = pathname === '/admin/login';

  // Admin routes: redirect to admin login if not authenticated
  if (pathname.startsWith('/admin') && !isAdminLoginPage) {
    const isAdminAuth = request.cookies.get('admin_auth')?.value === 'true';
    if (!isAdminAuth) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    return NextResponse.next();
  }

  // Customer routes: redirect to login if not authenticated
  if (!isLoginPage && !isAdminLoginPage && !pathname.startsWith('/admin') && !pathname.startsWith('/api')) {
    const isUserAuth = request.cookies.get('user_auth')?.value === 'true';
    if (!isUserAuth) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
