import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// Stackframe
import { StackServerApp } from "@stackframe/stack";
import { stackClientApp } from "./stack/client";

const PROTECTED_ROUTES = ["/dashboard", "/inventory", "/add-products", "/settings"];

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	
	if (pathname.startsWith("/sign-in") || pathname.startsWith("/handler")) {
		return NextResponse.next();
	}
	
	const stackApp = new StackServerApp({
		inheritsFrom: stackClientApp,
		tokenStore: request as any,
	});

	const user = await stackApp.getUser({ or: "return-null" });
	
	if (user && pathname === "/") {
		return NextResponse.redirect(new URL("/dashboard", request.url));
	}
	
	if (!user && PROTECTED_ROUTES.some(route => pathname.startsWith(route))) {
		return NextResponse.redirect(new URL("/sign-in", request.url));
	}
	
	return NextResponse.next();
}

export const config = {
	matcher: [
		"/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
	],
};

