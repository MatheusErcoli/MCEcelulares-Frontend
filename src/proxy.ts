import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const token = request.cookies.get('auth_token');

  if (!token && request.nextUrl.pathname.startsWith('/carrinho')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}