import { auth } from "@/lib/auth";
import { applySecurityHeaders } from "@/lib/headers";
import { NextResponse } from "next/server";

export default auth(() => {
  const response = NextResponse.next();

  applySecurityHeaders(response);

  return response;
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
