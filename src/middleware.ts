import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, isActiveLocale } from "@/lib/i18n";

/**
 * Rewrites unprefixed URLs onto the default locale, so /clases and
 * /en/classes both resolve to app/[locale]/[slug].
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];

  if (first && isActiveLocale(first)) {
    if (first === DEFAULT_LOCALE) {
      // One canonical URL per page: /es/foo redirects to /foo.
      const url = request.nextUrl.clone();
      url.pathname = "/" + segments.slice(1).join("/");
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    "/((?!_next|studio|guia|api|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|woff2?)$).*)",
  ],
};
