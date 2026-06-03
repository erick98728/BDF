import { NextResponse, type NextRequest } from "next/server";
import { canAccessAdmin, canManageContent, canManageFeedback, canManageUsers } from "@/lib/adminTypes";
import { getAuthenticatedUser, getServerProfile, setAuthSessionCookies } from "@/lib/serverAuth";

export async function GET(request: NextRequest) {
  const { user, token, refreshed, session } = await getAuthenticatedUser(request);

  if (!user || !token) {
    return NextResponse.json({ authenticated: false, allowed: false, profile: null }, { status: 401 });
  }

  const profile = await getServerProfile(user.id, token);
  const capabilities = {
    canAccessAdmin: canAccessAdmin(profile),
    canManageContent: canManageContent(profile),
    canManageUsers: canManageUsers(profile),
    canManageFeedback: canManageFeedback(profile)
  };

  if (!capabilities.canAccessAdmin || !profile) {
    const response = NextResponse.json({ authenticated: true, allowed: false, profile: null, capabilities }, { status: 403 });
    if (refreshed && session) {
      setAuthSessionCookies(response, session);
    }
    return response;
  }

  const response = NextResponse.json({
    authenticated: true,
    allowed: true,
    profile: {
      id: profile.id,
      email: profile.email,
      display_name: profile.display_name,
      role: profile.role,
      permissions: profile.permissions,
      active: profile.active
    },
    capabilities
  });

  if (refreshed && session) {
    setAuthSessionCookies(response, session);
  }

  return response;
}
