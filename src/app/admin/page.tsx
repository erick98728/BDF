"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatedPageWrapper } from "@/components/AnimatedPageWrapper";
import { GameGlyph, type GameGlyphName } from "@/components/GameGlyph";
import { GlowCard } from "@/components/GlowCard";
import { PageHeader } from "@/components/PageHeader";
import { SectionContainer } from "@/components/SectionContainer";
import { SectionTitle } from "@/components/SectionTitle";
import { StatusBadge } from "@/components/TesterVisualSystem";
import { adminPermissions, adminRoles, type AdminPermission, type AdminProfile, type AdminRole, type EditableCharacter, type EditableGalleryItem, type SiteContent } from "@/lib/adminTypes";
import type { AdminFeedbackItem, FeedbackStatus } from "@/types/feedback";
import { listProfiles, loadSiteContent, saveSiteContent, updateProfilePermissions } from "@/lib/adminApi";
import { defaultSiteContent, mergeSiteContent } from "@/lib/defaultSiteContent";
import { isSupabaseConfigured } from "@/lib/supabaseClient";

const fieldClass = "min-h-11 w-full rounded-lg border border-cyan-200/20 bg-black/20 px-3 py-2 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 hover:border-cyan-200/30 hover:bg-black/25 focus:border-cyan-200/45 focus:bg-black/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200";
const labelClass = "text-xs font-semibold uppercase tracking-[0.14em] text-cyan-200/75";
const glyphOptions: GameGlyphName[] = ["katana", "fog", "ruin", "map", "dash", "boss", "platform", "status", "user", "lore", "gallery", "enemy", "future", "content", "tool"];
const galleryKinds = ["screenshot", "concept", "character", "scene", "video"] as const;
const characterKinds = ["rubens", "lucarelli", "enemy", "future", "planned"] as const;
const galleryCategories = ["Screenshots", "Conceitos", "Personagens", "Cenários", "Vídeos"] as const;
const feedbackStatuses: FeedbackStatus[] = ["new", "reviewing", "resolved", "ignored"];
const feedbackStatusLabels: Record<FeedbackStatus, string> = {
  new: "Novo",
  reviewing: "Em análise",
  resolved: "Resolvido",
  ignored: "Ignorado"
};


export default function AdminPage() {
  const router = useRouter();
  const [capabilities, setCapabilities] = useState<AdminCapabilities>(defaultAdminCapabilities);
  const [profiles, setProfiles] = useState<AdminProfile[]>([]);
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function boot() {
      if (!isSupabaseConfigured) {
        setError("Configure o Supabase para ativar login, permissões e persistência segura do painel.");
        setLoading(false);
        return;
      }
      const session = await getAdminSession();
      if (!session.authenticated) {
        router.replace("/login?redirect=/admin");
        return;
      }
      if (!session.allowed || !session.profile) {
        router.replace("/admin/acesso-negado");
        return;
      }

      setCapabilities(session.capabilities);
      const [loadedContent, loadedProfiles] = await Promise.all([loadSiteContent(), session.capabilities.canManageUsers ? listProfiles() : Promise.resolve([])]);
      setContent(loadedContent);
      setProfiles(loadedProfiles);
      setLoading(false);
    }
    boot();
  }, [router]);

  const stats = useMemo(() => [
    { label: "Galeria", value: content.gallery.items.length, icon: "gallery" as GameGlyphName },
    { label: "Personagens", value: content.characters.current.length + content.characters.enemies.length + content.characters.future.length, icon: "user" as GameGlyphName },
    { label: "Usuários", value: profiles.length || "restrito", icon: "status" as GameGlyphName }
  ], [content, profiles]);

  async function handleSave(event: FormEvent) {
    event.preventDefault();
    if (!capabilities.canManageContent) return setError("Sua conta pode visualizar o painel, mas não pode salvar conteúdo.");
    setSaving(true);
    setError(null);
    setMessage(null);
    try {
      const saved = await saveSiteContent(mergeSiteContent(content));
      setContent(saved);
      setMessage("Conteúdo salvo com segurança no Supabase. As páginas públicas serão atualizadas automaticamente.");
    } catch {
      setError("Não foi possível salvar. Verifique as políticas RLS e tente novamente.");
    } finally {
      setSaving(false);
    }
  }

  async function handleUserSave(user: AdminProfile, role: AdminRole, permissions: AdminPermission[], active: boolean) {
    if (!capabilities.canManageUsers) return;
    setSaving(true);
    setError(null);
    try {
      await updateProfilePermissions(user.id, role, permissions, active);
      setProfiles((items) => items.map((item) => item.id === user.id ? { ...item, role, permissions, active } : item));
      setMessage(`Permissões de ${user.email ?? "usuário"} atualizadas.`);
    } catch {
      setError("Não foi possível atualizar permissões. Apenas super administradores podem gerenciar usuários.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <AdminShell><GlowCard contentClassName="p-6"><p className="text-sm text-slate-300">Verificando sessão, cargo e permissões...</p></GlowCard></AdminShell>;
  }

  return (
    <AdminShell>
      <SectionContainer>
        <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <GlowCard variant="highlight" contentClassName="relative overflow-hidden p-5 sm:p-7">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(99,221,255,0.14),transparent_32%),radial-gradient(circle_at_80%_76%,rgba(251,191,36,0.10),transparent_34%)]" />
            <div className="relative z-10">
              <div className="flex flex-wrap gap-2">
                <StatusBadge status="ready">Painel privado</StatusBadge>
                <StatusBadge status={capabilities.canManageContent ? "ready" : "warning"}>{capabilities.canManageContent ? "Pode editar" : "Somente leitura"}</StatusBadge>
                <StatusBadge status={capabilities.canManageUsers ? "ready" : "warning"}>{capabilities.canManageUsers ? "Super admin" : "Usuários restritos"}</StatusBadge>
              </div>
              <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">Administração profissional do site</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">Gerencie textos, galeria, personagens, imagens externas e permissões sem editar o código. Rotas e menus administrativos são bloqueados para usuários sem autorização.</p>
            </div>
          </GlowCard>
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {stats.map((stat) => <GlowCard key={stat.label} variant="flat" contentClassName="flex items-center gap-4 p-4"><GameGlyph name={stat.icon} /><div><p className="text-xs uppercase tracking-[0.14em] text-slate-400">{stat.label}</p><p className="mt-1 text-xl font-bold text-white">{stat.value}</p></div></GlowCard>)}
          </div>
        </div>
      </SectionContainer>

      {(message || error) ? <SectionContainer><div className={`rounded-xl border px-4 py-3 text-sm ${error ? "border-red-300/25 bg-red-500/10 text-red-100" : "border-emerald-300/25 bg-emerald-500/10 text-emerald-100"}`}>{error ?? message}</div></SectionContainer> : null}

      <form onSubmit={handleSave}>
        <SectionContainer withDivider>
          <SectionTitle eyebrow="Conteúdo público" title="Textos principais" subtitle="Atualize chamadas públicas exibidas na home, lore, galeria e personagens." />
          <div className="grid gap-4 lg:grid-cols-2">
            <TextBlockEditor title="Home" block={content.home} onChange={(home) => setContent({ ...content, home })} />
            <TextBlockEditor title="Lore" block={content.lore} onChange={(lore) => setContent({ ...content, lore })} />
            <TextBlockEditor title="Introdução da galeria" block={content.gallery.intro} onChange={(intro) => setContent({ ...content, gallery: { ...content.gallery, intro } })} />
            <TextBlockEditor title="Introdução dos personagens" block={content.characters.intro} onChange={(intro) => setContent({ ...content, characters: { ...content.characters, intro } })} />
          </div>
        </SectionContainer>

        <SectionContainer withDivider>
          <CollectionHeader title="Galeria de imagens" subtitle="Adicione, edite ou remova registros visuais e URLs de imagem." onAdd={() => setContent({ ...content, gallery: { ...content.gallery, items: [...content.gallery.items, newGalleryItem()] } })} />
          <div className="grid gap-4 lg:grid-cols-2">
            {content.gallery.items.map((item, index) => <GalleryItemEditor key={item.id} item={item} onRemove={() => setContent({ ...content, gallery: { ...content.gallery, items: content.gallery.items.filter((_, i) => i !== index) } })} onChange={(next) => setContent({ ...content, gallery: { ...content.gallery, items: content.gallery.items.map((old, i) => i === index ? next : old) } })} />)}
          </div>
        </SectionContainer>

        <SectionContainer withDivider>
          <CollectionHeader title="Personagens" subtitle="Cadastre personagens atuais, inimigos e futuros conteúdos." onAdd={() => setContent({ ...content, characters: { ...content.characters, current: [...content.characters.current, newCharacter()] } })} />
          <CharacterGroup title="Elenco atual" items={content.characters.current} onChange={(current) => setContent({ ...content, characters: { ...content.characters, current } })} />
          <CharacterGroup title="Ameaças" items={content.characters.enemies} onChange={(enemies) => setContent({ ...content, characters: { ...content.characters, enemies } })} />
          <CharacterGroup title="Futuros" items={content.characters.future} onChange={(future) => setContent({ ...content, characters: { ...content.characters, future } })} />
        </SectionContainer>

        <SectionContainer withDivider>
          <GlowCard contentClassName="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-cyan-200/80">Persistência segura</p>
              <h3 className="mt-2 text-xl font-semibold text-white">Salvar alterações públicas</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">As alterações usam autenticação Supabase, perfil autorizado e políticas RLS recomendadas na documentação.</p>
            </div>
            <button disabled={saving || !capabilities.canManageContent} className="tester-button rounded-xl border border-cyan-200/30 bg-cyan-300/12 px-5 py-3 text-sm font-bold text-cyan-50 hover:bg-cyan-300/18 disabled:cursor-not-allowed disabled:opacity-50">{saving ? "Salvando..." : "Salvar conteúdo"}</button>
          </GlowCard>
        </SectionContainer>
      </form>

      {capabilities.canManageFeedback ? <FeedbackAdminSection /> : null}

      {capabilities.canManageUsers ? <UserPermissionsPanel profiles={profiles} onSave={handleUserSave} /> : null}
    </AdminShell>
  );
}

function AdminShell({ children }: { children: React.ReactNode }) {
  return <AnimatedPageWrapper><PageHeader variant="admin" eyebrow="Admin" title="Administração" description="Painel privado para gerenciar conteúdo, usuários e permissões do projeto Tester." />{children}</AnimatedPageWrapper>;
}

function TextBlockEditor({ title, block, onChange }: { title: string; block: SiteContent["home"]; onChange: (block: SiteContent["home"]) => void }) {
  return <GlowCard contentClassName="grid gap-3 p-4"><h3 className="text-lg font-semibold text-white">{title}</h3><Input label="Selo" value={block.eyebrow ?? ""} onChange={(eyebrow) => onChange({ ...block, eyebrow })} /><Input label="Título" value={block.title} onChange={(value) => onChange({ ...block, title: value })} /><Textarea label="Descrição" value={block.description} onChange={(description) => onChange({ ...block, description })} /></GlowCard>;
}

function GalleryItemEditor({ item, onChange, onRemove }: { item: EditableGalleryItem; onChange: (item: EditableGalleryItem) => void; onRemove: () => void }) {
  return <GlowCard contentClassName="grid gap-3 p-4"><EditorTop title={item.name || "Item da galeria"} icon="gallery" onRemove={onRemove} /><Input label="Nome" value={item.name} onChange={(name) => onChange({ ...item, name })} /><div className="grid gap-3 sm:grid-cols-3"><Select label="Categoria" value={item.category} options={galleryCategories} onChange={(category) => onChange({ ...item, category: category as EditableGalleryItem["category"] })} /><Select label="Visual" value={item.visualKind} options={galleryKinds} onChange={(visualKind) => onChange({ ...item, visualKind: visualKind as EditableGalleryItem["visualKind"] })} /><Select label="Ícone" value={item.icon} options={glyphOptions} onChange={(icon) => onChange({ ...item, icon: icon as GameGlyphName })} /></div><Select label="Status" value={item.status} options={["Prévia visual", "Em desenvolvimento"]} onChange={(status) => onChange({ ...item, status: status as EditableGalleryItem["status"] })} /><Input label="URL da imagem opcional" value={item.imageUrl ?? ""} onChange={(imageUrl) => onChange({ ...item, imageUrl })} /><Input label="Texto alternativo da imagem" value={item.altText ?? ""} placeholder="Descreva a imagem para acessibilidade" onChange={(altText) => onChange({ ...item, altText })} /><Textarea label="Descrição" value={item.description} onChange={(description) => onChange({ ...item, description })} /><Textarea label="Detalhe" value={item.detail} onChange={(detail) => onChange({ ...item, detail })} /></GlowCard>;
}

function CharacterGroup({ title, items, onChange }: { title: string; items: EditableCharacter[]; onChange: (items: EditableCharacter[]) => void }) {
  return <div className="mt-5"><CollectionHeader title={title} subtitle={`${items.length} registros`} compact onAdd={() => onChange([...items, newCharacter()])} /><div className="grid gap-4 lg:grid-cols-2">{items.map((item, index) => <CharacterEditor key={item.id} item={item} onRemove={() => onChange(items.filter((_, i) => i !== index))} onChange={(next) => onChange(items.map((old, i) => i === index ? next : old))} />)}</div></div>;
}

function CharacterEditor({ item, onChange, onRemove }: { item: EditableCharacter; onChange: (item: EditableCharacter) => void; onRemove: () => void }) {
  return <GlowCard contentClassName="grid gap-3 p-4"><EditorTop title={item.name || "Personagem"} icon={item.icon} onRemove={onRemove} /><div className="grid gap-3 sm:grid-cols-2"><Input label="Nome" value={item.name} onChange={(name) => onChange({ ...item, name })} /><Input label="Função" value={item.functionLabel} onChange={(functionLabel) => onChange({ ...item, functionLabel })} /><Input label="Estado" value={item.projectState} onChange={(projectState) => onChange({ ...item, projectState })} /><Input label="Badge" value={item.badge} onChange={(badge) => onChange({ ...item, badge })} /></div><div className="grid gap-3 sm:grid-cols-2"><Select label="Visual" value={item.visualKind} options={characterKinds} onChange={(visualKind) => onChange({ ...item, visualKind: visualKind as EditableCharacter["visualKind"] })} /><Select label="Ícone" value={item.icon} options={glyphOptions} onChange={(icon) => onChange({ ...item, icon: icon as GameGlyphName })} /></div><Input label="URL da imagem opcional" value={item.imageUrl ?? ""} onChange={(imageUrl) => onChange({ ...item, imageUrl })} /><Input label="Texto alternativo da imagem" value={item.altText ?? ""} placeholder="Descreva a imagem do personagem para acessibilidade" onChange={(altText) => onChange({ ...item, altText })} /><Textarea label="Descrição" value={item.description} onChange={(description) => onChange({ ...item, description })} /><Textarea label="Papel no beta" value={item.betaRole} onChange={(betaRole) => onChange({ ...item, betaRole })} /><Input label="Habilidades (separadas por vírgula)" value={item.abilities.join(", ")} onChange={(value) => onChange({ ...item, abilities: value.split(",").map((ability) => ability.trim()).filter(Boolean) })} /></GlowCard>;
}


type FeedbackFilters = {
  status: string;
  foundBug: string;
  version: string;
  search: string;
};

const defaultFeedbackFilters: FeedbackFilters = {
  status: "",
  foundBug: "",
  version: "",
  search: ""
};

function FeedbackAdminSection() {
  const [feedbacks, setFeedbacks] = useState<AdminFeedbackItem[]>([]);
  const [filters, setFilters] = useState<FeedbackFilters>(defaultFeedbackFilters);
  const [loadingFeedbacks, setLoadingFeedbacks] = useState(true);
  const [feedbackError, setFeedbackError] = useState<string | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const summary = useMemo(() => ({
    total: feedbacks.length,
    new: feedbacks.filter((item) => item.status === "new").length,
    reviewing: feedbacks.filter((item) => item.status === "reviewing").length,
    resolved: feedbacks.filter((item) => item.status === "resolved").length,
    bugs: feedbacks.filter((item) => item.found_bug).length
  }), [feedbacks]);

  const loadFeedbacks = useCallback(async (nextFilters: FeedbackFilters) => {
    setLoadingFeedbacks(true);
    setFeedbackError(null);
    const params = new URLSearchParams({ limit: "50" });
    if (nextFilters.status) params.set("status", nextFilters.status);
    if (nextFilters.foundBug) params.set("found_bug", nextFilters.foundBug);
    if (nextFilters.version.trim()) params.set("version", nextFilters.version.trim());
    if (nextFilters.search.trim()) params.set("search", nextFilters.search.trim());

    try {
      const response = await fetch(`/api/admin/feedback?${params.toString()}`, { cache: "no-store", headers: { Accept: "application/json" } });
      const data = (await response.json().catch(() => ({}))) as { feedbacks?: AdminFeedbackItem[]; error?: string };
      if (!response.ok) {
        setFeedbackError(data.error ?? "Não foi possível carregar feedbacks.");
        return;
      }
      setFeedbacks(data.feedbacks ?? []);
    } catch {
      setFeedbackError("Não foi possível conectar ao servidor de feedbacks.");
    } finally {
      setLoadingFeedbacks(false);
    }
  }, []);

  useEffect(() => {
    loadFeedbacks(defaultFeedbackFilters);
  }, [loadFeedbacks]);

  async function updateFeedback(id: string, status: FeedbackStatus, adminNotes: string) {
    setFeedbackError(null);
    setFeedbackMessage(null);
    try {
      const response = await fetch(`/api/admin/feedback/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ status, admin_notes: adminNotes })
      });
      const data = (await response.json().catch(() => ({}))) as { feedback?: AdminFeedbackItem; error?: string };
      if (!response.ok || !data.feedback) {
        setFeedbackError(data.error ?? "Não foi possível atualizar o feedback.");
        return;
      }
      setFeedbacks((items) => items.map((item) => item.id === id ? data.feedback as AdminFeedbackItem : item));
      setFeedbackMessage("Feedback atualizado com status e notas administrativas.");
    } catch {
      setFeedbackError("Não foi possível conectar ao servidor para atualizar o feedback.");
    }
  }

  return (
    <SectionContainer withDivider>
      <SectionTitle eyebrow="Admin" title="Feedbacks do beta" subtitle="Visualize, filtre e faça a triagem dos retornos privados enviados pelos testers." />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <FeedbackSummaryCard label="Total" value={summary.total} />
        <FeedbackSummaryCard label="Novos" value={summary.new} tone="cyan" />
        <FeedbackSummaryCard label="Em análise" value={summary.reviewing} tone="gold" />
        <FeedbackSummaryCard label="Resolvidos" value={summary.resolved} tone="emerald" />
        <FeedbackSummaryCard label="Com bug" value={summary.bugs} tone="purple" />
      </div>

      <GlowCard variant="panel" contentClassName="mt-5 grid gap-4 p-4 lg:grid-cols-[160px_160px_1fr_1fr_auto] lg:items-end">
        <Select label="Status" value={filters.status} options={["", ...feedbackStatuses]} onChange={(status) => setFilters({ ...filters, status })} />
        <Select label="Encontrou bug" value={filters.foundBug} options={["", "true", "false"]} onChange={(foundBug) => setFilters({ ...filters, foundBug })} />
        <Input label="Versão" value={filters.version} placeholder="Tester Beta 0.1" onChange={(version) => setFilters({ ...filters, version })} />
        <Input label="Busca" value={filters.search} placeholder="Email, apelido ou texto" onChange={(search) => setFilters({ ...filters, search })} />
        <button type="button" onClick={() => loadFeedbacks(filters)} disabled={loadingFeedbacks} className="tester-button min-h-11 rounded-lg border border-cyan-200/25 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-50 hover:bg-cyan-300/15 disabled:cursor-not-allowed disabled:opacity-55">{loadingFeedbacks ? "Carregando..." : "Filtrar"}</button>
      </GlowCard>

      {(feedbackError || feedbackMessage) ? <div className={`mt-4 rounded-xl border px-4 py-3 text-sm ${feedbackError ? "border-red-300/25 bg-red-500/10 text-red-100" : "border-emerald-300/25 bg-emerald-500/10 text-emerald-100"}`}>{feedbackError ?? feedbackMessage}</div> : null}

      <div className="mt-5 grid gap-4">
        {loadingFeedbacks ? <GlowCard variant="flat" contentClassName="p-5 text-sm text-slate-300">Carregando feedbacks privados...</GlowCard> : null}
        {!loadingFeedbacks && feedbacks.length === 0 ? <GlowCard variant="flat" contentClassName="p-5 text-sm text-slate-300">Nenhum feedback encontrado com os filtros atuais.</GlowCard> : null}
        {feedbacks.map((feedback) => <FeedbackCard key={feedback.id} feedback={feedback} onSave={updateFeedback} />)}
      </div>
    </SectionContainer>
  );
}

function FeedbackSummaryCard({ label, value, tone = "neutral" }: { label: string; value: number; tone?: "cyan" | "gold" | "emerald" | "purple" | "neutral" }) {
  const toneClass = {
    cyan: "border-cyan-200/20 bg-cyan-300/10 text-cyan-100",
    gold: "border-amber-200/20 bg-amber-300/10 text-amber-100",
    emerald: "border-emerald-200/20 bg-emerald-300/10 text-emerald-100",
    purple: "border-purple-200/20 bg-purple-300/10 text-purple-100",
    neutral: "border-slate-200/15 bg-white/[0.04] text-white"
  }[tone];

  return <div className={`rounded-2xl border px-4 py-3 ${toneClass}`}><p className="text-xs uppercase tracking-[0.14em] opacity-75">{label}</p><p className="mt-1 text-2xl font-bold">{value}</p></div>;
}

function FeedbackCard({ feedback, onSave }: { feedback: AdminFeedbackItem; onSave: (id: string, status: FeedbackStatus, adminNotes: string) => Promise<void> }) {
  const [status, setStatus] = useState<FeedbackStatus>(feedback.status);
  const [adminNotes, setAdminNotes] = useState(feedback.admin_notes ?? "");
  const [savingFeedback, setSavingFeedback] = useState(false);

  useEffect(() => {
    setStatus(feedback.status);
    setAdminNotes(feedback.admin_notes ?? "");
  }, [feedback]);

  async function handleSave() {
    setSavingFeedback(true);
    await onSave(feedback.id, status, adminNotes);
    setSavingFeedback(false);
  }

  return (
    <GlowCard contentClassName="grid gap-4 p-4 lg:grid-cols-[1fr_320px]">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <FeedbackStatusPill status={feedback.status} />
          <span className="rounded-full border border-cyan-200/10 bg-black/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.13em] text-slate-300">{feedback.found_bug ? "Com bug" : "Sem bug"}</span>
          <span className="text-xs text-slate-400">{formatDate(feedback.created_at)}</span>
        </div>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <FeedbackInfo label="Apelido" value={feedback.nickname} />
          <FeedbackInfo label="Email" value={feedback.email} />
          <FeedbackInfo label="Tempo jogado" value={feedback.playtime} />
          <FeedbackInfo label="Progresso" value={feedback.progress_point} />
          <FeedbackInfo label="Versão" value={feedback.beta_version ?? "Sem versão"} />
          <FeedbackInfo label="Notas" value={`Mov. ${feedback.movement_rating} · Comb. ${feedback.combat_rating} · Mapa ${feedback.map_rating} · Dif. ${feedback.difficulty_rating}`} />
        </div>
        {feedback.bug_description ? <FeedbackTextBlock label="Descrição do bug" value={feedback.bug_description} /> : null}
        {feedback.suggestions ? <FeedbackTextBlock label="Sugestões" value={feedback.suggestions} /> : null}
        {feedback.admin_notes ? <FeedbackTextBlock label="Notas administrativas atuais" value={feedback.admin_notes} muted /> : null}
      </div>
      <div className="grid gap-3 rounded-2xl border border-cyan-200/10 bg-black/20 p-4">
        <Select label="Status" value={status} options={feedbackStatuses} onChange={(nextStatus) => setStatus(nextStatus as FeedbackStatus)} />
        <label className="grid gap-2"><span className={labelClass}>Notas administrativas</span><textarea className={`${fieldClass} min-h-32 resize-y`} value={adminNotes} placeholder="Registre análise, decisão ou próximos passos" onChange={(event) => setAdminNotes(event.target.value)} /></label>
        <button type="button" onClick={handleSave} disabled={savingFeedback} className="tester-button rounded-lg border border-emerald-200/25 bg-emerald-300/10 px-4 py-2 text-sm font-semibold text-emerald-100 hover:bg-emerald-300/15 disabled:cursor-not-allowed disabled:opacity-55">{savingFeedback ? "Salvando..." : "Atualizar feedback"}</button>
      </div>
    </GlowCard>
  );
}

function FeedbackInfo({ label, value }: { label: string; value: string }) {
  return <div className="rounded-xl border border-white/5 bg-white/[0.03] px-3 py-2"><p className={labelClass}>{label}</p><p className="mt-1 break-words text-sm text-slate-100">{value}</p></div>;
}

function FeedbackTextBlock({ label, value, muted = false }: { label: string; value: string; muted?: boolean }) {
  return <div className={`mt-3 rounded-xl border px-3 py-3 ${muted ? "border-amber-200/10 bg-amber-300/[0.04]" : "border-cyan-200/10 bg-cyan-300/[0.04]"}`}><p className={labelClass}>{label}</p><p className="mt-2 whitespace-pre-wrap break-words text-sm leading-6 text-slate-200">{value}</p></div>;
}

function FeedbackStatusPill({ status }: { status: FeedbackStatus }) {
  const className = {
    new: "border-cyan-200/25 bg-cyan-300/10 text-cyan-100",
    reviewing: "border-amber-200/25 bg-amber-300/10 text-amber-100",
    resolved: "border-emerald-200/25 bg-emerald-300/10 text-emerald-100",
    ignored: "border-slate-200/15 bg-white/[0.04] text-slate-200"
  }[status];

  return <span className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.13em] ${className}`}>{feedbackStatusLabels[status]}</span>;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" }).format(new Date(value));
}

function UserPermissionsPanel({ profiles, onSave }: { profiles: AdminProfile[]; onSave: (user: AdminProfile, role: AdminRole, permissions: AdminPermission[], active: boolean) => void }) {
  const [drafts, setDrafts] = useState<Record<string, AdminProfile>>({});
  return <SectionContainer withDivider><SectionTitle title="Usuários e permissões" subtitle="Visível somente para super administradores ou contas com manage_users." /><div className="grid gap-4">{profiles.map((user) => { const draft = drafts[user.id] ?? user; return <GlowCard key={user.id} contentClassName="grid gap-4 p-4 lg:grid-cols-[1fr_170px_1fr_120px]"><div><p className="font-semibold text-white">{user.email ?? "Sem e-mail"}</p><p className="mt-1 text-xs text-slate-400">{user.id}</p></div><Select label="Cargo" value={draft.role} options={adminRoles} onChange={(role) => setDrafts({ ...drafts, [user.id]: { ...draft, role: role as AdminRole } })} /><div><p className={labelClass}>Permissões</p><div className="mt-2 flex flex-wrap gap-2">{adminPermissions.map((permission) => <label key={permission} className="inline-flex items-center gap-2 rounded-lg border border-cyan-200/10 bg-black/20 px-3 py-2 text-xs text-slate-200"><input type="checkbox" checked={draft.permissions.includes(permission)} onChange={(event) => setDrafts({ ...drafts, [user.id]: { ...draft, permissions: event.target.checked ? [...draft.permissions, permission] : draft.permissions.filter((item) => item !== permission) } })} className="accent-cyan-300" />{permission}</label>)}</div></div><div className="flex flex-col gap-2"><label className="inline-flex items-center gap-2 text-sm text-slate-200"><input type="checkbox" checked={draft.active} onChange={(event) => setDrafts({ ...drafts, [user.id]: { ...draft, active: event.target.checked } })} className="accent-cyan-300" />Ativo</label><button type="button" onClick={() => onSave(user, draft.role, draft.permissions, draft.active)} className="tester-button rounded-lg border border-emerald-200/25 bg-emerald-300/10 px-3 py-2 text-sm font-semibold text-emerald-100">Salvar</button></div></GlowCard>; })}</div></SectionContainer>;
}

function CollectionHeader({ title, subtitle, onAdd, compact = false }: { title: string; subtitle: string; onAdd: () => void; compact?: boolean }) {
  return <div className={`mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between ${compact ? "mt-2" : ""}`}><div><h3 className="text-xl font-bold text-white">{title}</h3><p className="mt-1 text-sm text-slate-400">{subtitle}</p></div><button type="button" onClick={onAdd} className="tester-button rounded-lg border border-cyan-200/25 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-50 hover:bg-cyan-300/15">Adicionar</button></div>;
}

function EditorTop({ title, icon, onRemove }: { title: string; icon: GameGlyphName; onRemove: () => void }) {
  return <div className="flex items-center justify-between gap-3"><div className="flex items-center gap-3"><GameGlyph name={icon} /><h4 className="font-semibold text-white">{title}</h4></div><button type="button" onClick={onRemove} className="tester-button rounded-lg border border-red-300/20 bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-100">Remover</button></div>;
}

function Input({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string }) {
  return <label className="grid gap-2"><span className={labelClass}>{label}</span><input className={fieldClass} value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} /></label>;
}

function Textarea({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return <label className="grid gap-2"><span className={labelClass}>{label}</span><textarea className={`${fieldClass} min-h-24 resize-y`} value={value} onChange={(event) => onChange(event.target.value)} /></label>;
}

function Select({ label, value, options, onChange }: { label: string; value: string; options: readonly string[]; onChange: (value: string) => void }) {
  return <label className="grid gap-2"><span className={labelClass}>{label}</span><select className={fieldClass} value={value} onChange={(event) => onChange(event.target.value)}>{options.map((option) => <option key={option || "all"} value={option} className="bg-slate-950">{formatSelectOption(option)}</option>)}</select></label>;
}

function formatSelectOption(option: string) {
  if (!option) return "Todos";
  if (option === "true") return "Sim";
  if (option === "false") return "Não";
  if (feedbackStatuses.includes(option as FeedbackStatus)) return feedbackStatusLabels[option as FeedbackStatus];
  return option;
}

function newGalleryItem(): EditableGalleryItem {
  const id = `galeria-${Date.now()}`;
  return { id, name: "Novo item", category: "Screenshots", status: "Em desenvolvimento", description: "Descrição do item.", detail: "Detalhe exibido no modal.", icon: "gallery", visualKind: "screenshot" };
}

function newCharacter(): EditableCharacter {
  const id = `personagem-${Date.now()}`;
  return { id, name: "Novo personagem", functionLabel: "Função", projectState: "Em preparação", badge: "Novo", icon: "user", visualKind: "future", description: "Descrição do personagem.", betaRole: "Papel no projeto.", abilities: ["Habilidade"] };
}


type AdminCapabilities = {
  canAccessAdmin: boolean;
  canManageContent: boolean;
  canManageUsers: boolean;
  canManageFeedback: boolean;
};

const defaultAdminCapabilities: AdminCapabilities = {
  canAccessAdmin: false,
  canManageContent: false,
  canManageUsers: false,
  canManageFeedback: false
};

type AdminSessionResponse = {
  authenticated: boolean;
  allowed: boolean;
  profile: AdminProfile | null;
  capabilities?: AdminCapabilities;
};

type AdminSession = Omit<AdminSessionResponse, "capabilities"> & {
  capabilities: AdminCapabilities;
};

async function getAdminSession(): Promise<AdminSession> {
  try {
    const response = await fetch("/api/admin/me", { cache: "no-store", headers: { Accept: "application/json" } });
    const data = (await response.json().catch(() => null)) as AdminSessionResponse | null;

    if (!response.ok || !data) {
      return {
        authenticated: response.status !== 401 && Boolean(data?.authenticated),
        allowed: false,
        profile: null,
        capabilities: data?.capabilities ?? defaultAdminCapabilities
      };
    }

    return {
      ...data,
      capabilities: data.capabilities ?? defaultAdminCapabilities
    };
  } catch {
    return { authenticated: false, allowed: false, profile: null, capabilities: defaultAdminCapabilities };
  }
}
