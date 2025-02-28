import { NextRequest, NextResponse } from 'next/server'
import Cookies from 'js-cookie'

export function middleware (req: NextRequest) {
  const token = Cookies.get('token')

  if (!token && req.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return NextResponse.next()
}
