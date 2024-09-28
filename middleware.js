import { NextResponse } from "next/server";
import { checkToken } from "./app/Components/Useful";

export async function middleware(request) {
	let path = request.nextUrl.pathname;
	let token = request.cookies.get("USER_ACCESS_TOKEN")?.value;

	let check = await checkToken(token || "");

	if (!token && (path !== "/")) {
		return NextResponse.redirect(new URL("/", request.url));
	}

	if (!token && (path === "/")) {
		return NextResponse.next();
	}

	if ((token && check?.check) && ((path === "/"))) {
		return NextResponse.redirect(new URL("/main/dashboard", request.url));
	}
}

export const config = {
	matcher: [
		"/",
		"/main/:path*"
	],
};