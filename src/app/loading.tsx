export default function Loading() {
  return (
    <div className="route-loading-state" role="status" aria-live="polite">
      <div className="route-loading-state__mark" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div>
        <p className="editorial-label">Navegação</p>
        <p className="route-loading-state__label">Abrindo novo registro…</p>
      </div>
    </div>
  );
}
