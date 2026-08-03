export function AnimatedPageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="page-content" data-fx-page="true">
      {children}
    </div>
  );
}
