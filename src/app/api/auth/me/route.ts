import { NextResponse, type NextRequest } from "next/server";
import { getAuthenticatedUser } from "@/lib/serverAuth";

export async function GET(request: NextRequest) {
  const { user } = await getAuthenticatedUser(request);

  if (!user) {
    return NextResponse.json({
      authenticated: false,
      user: null
    });
  }

  return NextResponse.json({
    authenticated: true,
    user
  });
}
