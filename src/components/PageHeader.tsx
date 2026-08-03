import { TesterMark } from "./TesterVisualSystem";

type PageHeaderVariant = "default" | "compact" | "dashboard" | "admin";

type PageHeaderProps = {
  title: string;
  description: string;
  variant?: PageHeaderVariant;
  eyebrow?: string;
};

const variantClass: Record<PageHeaderVariant, string> = {
  default: "fx-page-header--default",
  compact: "fx-page-header--compact",
  dashboard: "fx-page-header--dashboard",
  admin: "fx-page-header--admin"
};

export function PageHeader({ title, description, variant = "default", eyebrow = "Canal oficial" }: PageHeaderProps) {
  return (
    <section
      className={`fx-page-header ${variantClass[variant]}`}
      data-fx-watch="page-header"
    >
      <div className="fx-page-header__grid tester-panel-grid" aria-hidden="true" />
      <div className="fx-page-header__mark" aria-hidden="true">
        <TesterMark />
      </div>
      <div className="fx-page-header__content">
        <p className="tester-kicker">{eyebrow}</p>
        <h1 className="fx-page-header__title">{title}</h1>
        <p className="fx-page-header__description">{description}</p>
        <div className="tester-title-line fx-page-header__line" />
      </div>
    </section>
  );
}
