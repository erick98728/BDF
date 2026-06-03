export const authAccessCookie = "tester-sb-access-token";
export const authRefreshCookie = "tester-sb-refresh-token";

const cookieOptions = "path=/; SameSite=Lax; secure";

export function writeAuthCookies(accessToken?: string | null, refreshToken?: string | null) {
  if (typeof document === "undefined") return;
  if (accessToken) {
    document.cookie = `${authAccessCookie}=${encodeURIComponent(accessToken)}; max-age=3600; ${cookieOptions}`;
  }
  if (refreshToken) {
    document.cookie = `${authRefreshCookie}=${encodeURIComponent(refreshToken)}; max-age=2592000; ${cookieOptions}`;
  }
}

export function clearAuthCookies() {
  if (typeof document === "undefined") return;
  document.cookie = `${authAccessCookie}=; max-age=0; ${cookieOptions}`;
  document.cookie = `${authRefreshCookie}=; max-age=0; ${cookieOptions}`;
}
