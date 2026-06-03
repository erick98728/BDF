import type { GameGlyphName } from "@/components/GameGlyph";
import type { GalleryVisualKind } from "@/components/GalleryVisualFrame";

export const adminRoles = ["user", "admin", "super_admin"] as const;
export type AdminRole = (typeof adminRoles)[number];

export const adminPermissions = ["view_admin", "manage_content", "manage_users"] as const;
export type AdminPermission = (typeof adminPermissions)[number];

export type AdminProfile = {
  id: string;
  email: string | null;
  display_name: string | null;
  role: AdminRole;
  permissions: AdminPermission[];
  active: boolean;
  created_at?: string;
  updated_at?: string;
};

export type EditableGalleryItem = {
  id: string;
  name: string;
  category: "Screenshots" | "Conceitos" | "Personagens" | "Cenários" | "Vídeos";
  status: "Prévia visual" | "Em desenvolvimento";
  description: string;
  detail: string;
  icon: GameGlyphName;
  visualKind: GalleryVisualKind;
  imageUrl?: string;
};

export type EditableCharacter = {
  id: string;
  name: string;
  functionLabel: string;
  projectState: string;
  badge: string;
  icon: GameGlyphName;
  visualKind: "rubens" | "lucarelli" | "enemy" | "future" | "planned";
  description: string;
  betaRole: string;
  abilities: string[];
  imageUrl?: string;
};

export type EditableTextBlock = {
  id: string;
  title: string;
  description: string;
  eyebrow?: string;
};

export type SiteContent = {
  home: EditableTextBlock;
  lore: EditableTextBlock;
  gallery: {
    intro: EditableTextBlock;
    items: EditableGalleryItem[];
  };
  characters: {
    intro: EditableTextBlock;
    current: EditableCharacter[];
    enemies: EditableCharacter[];
    future: EditableCharacter[];
  };
  updatedAt?: string;
};

export function canAccessAdmin(profile: Pick<AdminProfile, "role" | "permissions" | "active"> | null | undefined) {
  if (!profile?.active) return false;
  return profile.role === "admin" || profile.role === "super_admin" || profile.permissions.includes("view_admin") || profile.permissions.includes("manage_content");
}

export function canManageUsers(profile: Pick<AdminProfile, "role" | "permissions" | "active"> | null | undefined) {
  if (!profile?.active) return false;
  return profile.role === "super_admin" || profile.permissions.includes("manage_users");
}

export function canManageContent(profile: Pick<AdminProfile, "role" | "permissions" | "active"> | null | undefined) {
  if (!profile?.active) return false;
  return profile.role === "admin" || profile.role === "super_admin" || profile.permissions.includes("manage_content");
}
