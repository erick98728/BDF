import { authAccessCookie, authRefreshCookie } from "./authCookieNames";

export { authAccessCookie, authRefreshCookie };

const cookieOptions = "path=/; SameSite=Lax; secure";

/**
 * @deprecated Legacy client-side cookie writer kept temporarily during the auth migration.
 * New authentication routes must set auth cookies server-side with HttpOnly Set-Cookie.
 */
export function writeAuthCookies(accessToken?: string | null, refreshToken?: string | null) {
  if (typeof document === "undefined") return;
  if (accessToken) {
    document.cookie = `${authAccessCookie}=${encodeURIComponent(accessToken)}; max-age=3600; ${cookieOptions}`;
  }
  if (refreshToken) {
    document.cookie = `${authRefreshCookie}=${encodeURIComponent(refreshToken)}; max-age=2592000; ${cookieOptions}`;
  }
}

/**
 * @deprecated Legacy client-side cookie clearer kept temporarily during the auth migration.
 * New logout flows must clear auth cookies server-side with HttpOnly Set-Cookie.
 */
export function clearAuthCookies() {
  if (typeof document === "undefined") return;
  document.cookie = `${authAccessCookie}=; max-age=0; ${cookieOptions}`;
  document.cookie = `${authRefreshCookie}=; max-age=0; ${cookieOptions}`;
}
