import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
	let token = req.cookies.get('token')?.value;
	const { pathname } = req.nextUrl;

	const loginUrl = `${req.nextUrl.origin}/login`;
	const messengerUrl = `${req.nextUrl.origin}/conversation`;

	if (token && (pathname === '/' || pathname === '/login')) {
		return NextResponse.redirect(messengerUrl);
	}

	if (!token && pathname !== '/login' && pathname !== '/') {
		return NextResponse.redirect(loginUrl);
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/conversation/:path*', '/', '/login'],
};
