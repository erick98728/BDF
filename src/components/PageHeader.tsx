import { TesterMark } from "./TesterVisualSystem";

type PageHeaderVariant = "default" | "compact" | "dashboard" | "admin";

type PageHeaderProps = {
  title: string;
  description: string;
  variant?: PageHeaderVariant;
  eyebrow?: string;
};

const variantClass: Record<PageHeaderVariant, { section: string; title: string; description: string; mark: string }> = {
  default: {
    section: "py-10 sm:py-14 md:py-20",
    title: "text-[2.1rem] sm:text-5xl md:text-6xl",
    description: "text-[0.98rem] md:text-lg",
    mark: "opacity-55"
  },
  compact: {
    section: "py-8 sm:py-10 md:py-12",
    title: "text-3xl sm:text-4xl md:text-5xl",
    description: "text-sm md:text-base",
    mark: "opacity-35"
  },
  dashboard: {
    section: "py-7 sm:py-9 md:py-11",
    title: "text-3xl sm:text-4xl md:text-[2.8rem]",
    description: "text-sm md:text-base",
    mark: "opacity-30"
  },
  admin: {
    section: "py-6 sm:py-8 md:py-10",
    title: "text-3xl sm:text-4xl md:text-[2.7rem]",
    description: "text-sm md:text-base",
    mark: "opacity-25"
  }
};

export function PageHeader({ title, description, variant = "default", eyebrow = "Canal oficial" }: PageHeaderProps) {
  const style = variantClass[variant];

  return (
    <section className={`relative overflow-hidden ${style.section}`}>
      <div className="absolute inset-0 opacity-28 tester-panel-grid" aria-hidden="true" />
      <div className={`absolute right-0 top-8 hidden sm:block ${style.mark}`}>
        <TesterMark />
      </div>
      <div className="absolute left-0 top-8 h-28 w-28 rounded-full bg-cyan-300/[0.065] blur-2xl" />
      <div className="relative z-10 max-w-3xl">
        <p className="tester-kicker">{eyebrow}</p>
        <h1 className={`mt-4 font-black tracking-[0.01em] text-white drop-shadow-[0_0_18px_rgba(99,221,255,0.10)] ${style.title}`}>{title}</h1>
        <p className={`mt-4 max-w-2xl leading-7 text-slate-200 ${style.description}`}>{description}</p>
        <div className="tester-title-line mt-6" />
      </div>
    </section>
  );
}
