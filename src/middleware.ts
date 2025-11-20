import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Next.js Middleware
 *
 * Handles authentication and route protection.
 *
 * Protected routes: /dashboard/*, /brands/*, /calendar/*, /settings/*
 * Public routes: /login, /register, /
 *
 * Epic 1 (Story 1.9): Placeholder middleware - no actual auth check
 * Epic 2 (Story 2.2): Full Supabase auth implementation
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Define protected routes
  const protectedRoutes = ['/dashboard', '/brands', '/calendar', '/settings'];
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Epic 1: Placeholder - allow all routes
  // Epic 2: Implement Supabase auth check
  // const supabase = createServerClient();
  // const { data: { user } } = await supabase.auth.getUser();
  //
  // if (isProtectedRoute && !user) {
  //   return NextResponse.redirect(new URL('/login', request.url));
  // }
  //
  // if (!isProtectedRoute && user) {
  //   return NextResponse.redirect(new URL('/dashboard', request.url));
  // }

  // For now, allow all routes (no auth enforcement in Epic 1)
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api routes (handled separately)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
