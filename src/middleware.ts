import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { applySecurityHeaders } from "./lib/headers";

export default auth(() => {
  const response = NextResponse.next();

  applySecurityHeaders(response);

  return response;
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
