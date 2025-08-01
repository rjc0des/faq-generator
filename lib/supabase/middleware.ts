import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { hasEnvVars } from "../utils";

export async function updateSession(request: NextRequest) {
	let supabaseResponse = NextResponse.next({
		request,
	});

	// If the env vars are not set, skip middleware check. You can remove this once you setup the project.
	if (!hasEnvVars) {
		return supabaseResponse;
	}

	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				getAll() {
					return request.cookies.getAll();
				},
				setAll(cookiesToSet) {
					cookiesToSet.forEach(({ name, value }) =>
						request.cookies.set(name, value)
					);
					supabaseResponse = NextResponse.next({
						request,
					});
					cookiesToSet.forEach(({ name, value, options }) =>
						supabaseResponse.cookies.set(name, value, options)
					);
				},
			},
		}
	);

	// Do not run code between createServerClient and
	// supabase.auth.getUser(). A simple mistake could make it very hard to debug
	// issues with users being randomly logged out.

	// IMPORTANT: DO NOT REMOVE auth.getUser()

	const {
		data: { user },
	} = await supabase.auth.getUser();

	const protectedRoutes = [
		"/dashboard",
		"/billing",
		"/profile",
		"/generator",
		"/faq-management",
	];

	// ✅ Auth-only pages — redirect logged-in users away
	const authOnlyRoutes = ["/auth"];

	// 👮‍♂️ Redirect unauthenticated users trying to access protected routes
	if (protectedRoutes.includes(request.nextUrl.pathname) && !user) {
		return NextResponse.redirect(new URL("/auth", request.url));
	}

	// 🚫 Redirect logged-in users away from /auth pages
	if (
		authOnlyRoutes.some((path) =>
			request.nextUrl.pathname.startsWith(path)
		) &&
		user
	) {
		return NextResponse.redirect(new URL("/dashboard", request.url));
	}
	// if (
	// 	!unsecuredPathname.includes(request.nextUrl.pathname) &&
	// 	!user &&
	// 	request.nextUrl.pathname != "/auth"
	// ) {
	// 	console.log("hello");
	// 	// no user, potentially respond by redirecting the user to the login page
	// 	const url = request.nextUrl.clone();
	// 	url.pathname = "/auth";
	// 	return NextResponse.redirect(url);
	// }

	// IMPORTANT: You *must* return the supabaseResponse object as it is.
	// If you're creating a new response object with NextResponse.next() make sure to:
	// 1. Pass the request in it, like so:
	//    const myNewResponse = NextResponse.next({ request })
	// 2. Copy over the cookies, like so:
	//    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
	// 3. Change the myNewResponse object to fit your needs, but avoid changing
	//    the cookies!
	// 4. Finally:
	//    return myNewResponse
	// If this is not done, you may be causing the browser and server to go out
	// of sync and terminate the user's session prematurely!

	return supabaseResponse;
}
