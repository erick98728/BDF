import { NextResponse, type NextRequest } from "next/server";
import { getAuthenticatedUser, setAuthSessionCookies } from "@/lib/serverAuth";

export async function GET(request: NextRequest) {
  const { user, refreshed, session } = await getAuthenticatedUser(request);

  if (!user) {
    return NextResponse.json({
      authenticated: false,
      user: null
    });
  }

  const response = NextResponse.json({
    authenticated: true,
    user
  });

  if (refreshed && session) {
    setAuthSessionCookies(response, session);
  }

  return response;
}
