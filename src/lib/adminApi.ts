import { supabase, isSupabaseConfigured } from "./supabaseClient";
import type { AdminPermission, AdminProfile, AdminRole, SiteContent } from "./adminTypes";
import { defaultSiteContent, mergeSiteContent } from "./defaultSiteContent";

export const SITE_CONTENT_ID = "public-site";

// Client-compatible helpers below still rely on Supabase RLS for reads/writes.
// Initial admin authentication/authorization must use `/api/admin/me`, not this file.

// TODO(auth-migration): move user listing to a server-side admin endpoint.
export async function listProfiles(): Promise<AdminProfile[]> {
  if (!isSupabaseConfigured) return [];
  const { data, error } = await supabase
    .from("profiles")
    .select("id,email,display_name,role,permissions,active,created_at,updated_at")
    .order("created_at", { ascending: false });
  if (error || !data) return [];
  return data.map((profile) => normalizeProfile(profile as AdminProfile));
}

// TODO(auth-migration): move permission updates to a server-side admin endpoint.
export async function updateProfilePermissions(id: string, role: AdminRole, permissions: AdminPermission[], active: boolean) {
  const { error } = await supabase
    .from("profiles")
    .update({ role, permissions, active, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw error;
}

// Public-content reads can remain client-compatible because RLS controls visibility.
export async function loadSiteContent(): Promise<SiteContent> {
  if (!isSupabaseConfigured) return defaultSiteContent;
  const { data, error } = await supabase.from("site_content").select("content").eq("id", SITE_CONTENT_ID).maybeSingle();
  if (error || !data?.content) return defaultSiteContent;
  return mergeSiteContent(data.content as Partial<SiteContent>);
}

// TODO(auth-migration): move content writes to a server-side admin endpoint.
export async function saveSiteContent(content: SiteContent) {
  const userId = await getCurrentUserId();
  const payload = mergeSiteContent({ ...content, updatedAt: new Date().toISOString() });
  const { error } = await supabase.from("site_content").upsert({
    id: SITE_CONTENT_ID,
    content: payload,
    updated_by: userId,
    updated_at: new Date().toISOString()
  });
  if (error) throw error;
  return payload;
}

function normalizeProfile(profile: AdminProfile): AdminProfile {
  return {
    ...profile,
    role: profile.role ?? "user",
    permissions: Array.isArray(profile.permissions) ? profile.permissions : [],
    active: profile.active !== false
  };
}


type ServerSession = {
  authenticated: boolean;
  user: { id: string; email: string | null } | null;
};

async function getCurrentUserId(): Promise<string | null> {
  if (typeof window === "undefined") return null;

  try {
    const response = await fetch("/api/auth/me", { cache: "no-store", headers: { Accept: "application/json" } });
    if (!response.ok) return null;

    const session = (await response.json()) as ServerSession;
    return session.authenticated ? session.user?.id ?? null : null;
  } catch {
    return null;
  }
}
