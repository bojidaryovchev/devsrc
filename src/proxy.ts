import { DEFAULT_THEME } from "@/constants";
import { auth } from "@/lib/auth";
import { isRuntimeEnv } from "@/lib/env";
import { setSecurityHeaders } from "@/lib/headers";
import { NextRequest, NextResponse } from "next/server";

const setPathnameHeader = (res: NextResponse, pathname: string) => {
  res.headers.set("x-pathname", pathname);
};

const setDefaultTheme = (req: NextRequest, res: NextResponse) => {
  const theme = req.cookies.get("theme");

  if (!theme) {
    res.cookies.set("theme", DEFAULT_THEME, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1y in seconds
      httpOnly: false,
      secure: isRuntimeEnv("production"),
      sameSite: "lax",
    });
  }
};

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const res = NextResponse.next();

  setPathnameHeader(res, pathname);
  setDefaultTheme(req, res);
  setSecurityHeaders(res);

  return res;
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
