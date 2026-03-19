import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token');

  // Exemplo: proteger a rota de carrinho
  if (!token && request.nextUrl.pathname.startsWith('/carrinho')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}