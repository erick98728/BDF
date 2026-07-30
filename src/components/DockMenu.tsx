"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type DockPanel = "navigation" | "account";

type DockMenuProps = {
  pathname: string;
  logged: boolean;
  adminAllowed: boolean;
  onSignOut: () => Promise<void>;
};

type DockItem = {
  id: "inicio" | "calendario" | "mensagens" | "navegador" | "configuracoes";
  name: "Início" | "Calendário" | "Mensagens" | "Navegador" | "Configurações";
  href?: string;
  panel?: DockPanel;
};

type AnimatedDockItem = {
  element: HTMLElement;
  control: HTMLElement;
  baseSize: number;
  currentSize: number;
  targetSize: number;
  velocity: number;
  launchTimer: number | null;
};

const dockItems: DockItem[] = [
  { id: "inicio", name: "Início", href: "/" },
  { id: "calendario", name: "Calendário", href: "/roadmap" },
  { id: "mensagens", name: "Mensagens", href: "/feedback" },
  { id: "navegador", name: "Navegador", panel: "navigation" },
  { id: "configuracoes", name: "Configurações", panel: "account" },
];

const navigationLinks = [
  { href: "/download", label: "Download" },
  { href: "/lore", label: "Lore" },
  { href: "/personagens", label: "Personagens" },
  { href: "/studio", label: "Studio" },
  { href: "/devlog", label: "Devlog" },
  { href: "/galeria", label: "Galeria" },
] as const;

const CONFIG = Object.freeze({
  influenceRadius: 150,
  springStrength: 0.14,
  springFriction: 0.72,
  restThreshold: 0.02,
});

export function DockMenu({
  pathname,
  logged,
  adminAllowed,
  onSignOut,
}: DockMenuProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const dockRef = useRef<HTMLElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);
  const [openPanel, setOpenPanel] = useState<DockPanel | null>(null);

  useEffect(() => {
    setOpenPanel(null);
  }, [pathname]);

  useEffect(() => {
    if (!openPanel) return;

    function closeFromOutside(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !viewportRef.current?.contains(event.target)
      ) {
        setOpenPanel(null);
      }
    }

    function closeFromKeyboard(event: KeyboardEvent) {
      if (event.key !== "Escape") return;

      const activeTrigger = dockRef.current?.querySelector<HTMLElement>(
        '[aria-expanded="true"]',
      );

      setOpenPanel(null);
      activeTrigger?.focus();
    }

    document.addEventListener("pointerdown", closeFromOutside);
    document.addEventListener("keydown", closeFromKeyboard);

    return () => {
      document.removeEventListener("pointerdown", closeFromOutside);
      document.removeEventListener("keydown", closeFromKeyboard);
    };
  }, [openPanel]);

  useEffect(() => {
    const dock = dockRef.current;
    if (!dock) return;
    const dockElement: HTMLElement = dock;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    );
    const itemElements = [
      ...dock.querySelectorAll<HTMLElement>(".dock-menu__item"),
    ];
    const items = itemElements.flatMap<AnimatedDockItem>((element) => {
      const control =
        element.querySelector<HTMLElement>(".dock-menu__control");

      if (!control) return [];

      const computedStyle = getComputedStyle(element);
      const inheritedBaseSize = Number.parseFloat(
        computedStyle.getPropertyValue("--dock-menu-base-size"),
      );
      const measuredSize = Number.parseFloat(computedStyle.width);
      const baseSize =
        (Number.isFinite(inheritedBaseSize) && inheritedBaseSize > 0
          ? inheritedBaseSize
          : measuredSize) || 50;

      return [
        {
          element,
          control,
          baseSize,
          currentSize: baseSize,
          targetSize: baseSize,
          velocity: 0,
          launchTimer: null,
        },
      ];
    });

    const pointer = {
      clientX: 0,
      inside: false,
    };

    let animationFrame = 0;

    function getMaximumSize() {
      const cssMaximum = Number.parseFloat(
        getComputedStyle(dockElement).getPropertyValue(
          "--dock-menu-maximum-size",
        ),
      );

      return Number.isFinite(cssMaximum) && cssMaximum > 0
        ? cssMaximum
        : 80;
    }

    function setBaseTargets() {
      items.forEach((item) => {
        item.targetSize = item.baseSize;
      });
    }

    function updateTargetsFromPointer() {
      if (!pointer.inside || !finePointer.matches) {
        setBaseTargets();
        return;
      }

      const maximumSize = getMaximumSize();
      const centers = items.map((item) => {
        const bounds = item.element.getBoundingClientRect();
        return bounds.left + bounds.width / 2;
      });

      items.forEach((item, index) => {
        const distance = Math.abs(pointer.clientX - centers[index]);
        const influence = clamp(
          1 - distance / CONFIG.influenceRadius,
          0,
          1,
        );

        item.targetSize =
          item.baseSize + (maximumSize - item.baseSize) * influence;
      });
    }

    function renderReducedMotionState() {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      }

      items.forEach((item) => {
        item.currentSize = item.baseSize;
        item.targetSize = item.baseSize;
        item.velocity = 0;
        item.element.style.setProperty(
          "--dock-menu-item-size",
          `${item.baseSize}px`,
        );
      });
    }

    function animate() {
      animationFrame = 0;
      updateTargetsFromPointer();

      let shouldContinue = false;

      items.forEach((item) => {
        const displacement = item.targetSize - item.currentSize;

        item.velocity =
          (item.velocity + displacement * CONFIG.springStrength) *
          CONFIG.springFriction;
        item.currentSize += item.velocity;

        const isAtRest =
          Math.abs(displacement) < CONFIG.restThreshold &&
          Math.abs(item.velocity) < CONFIG.restThreshold;

        if (isAtRest) {
          item.currentSize = item.targetSize;
          item.velocity = 0;
        } else {
          shouldContinue = true;
        }
      });

      items.forEach((item) => {
        item.element.style.setProperty(
          "--dock-menu-item-size",
          `${item.currentSize.toFixed(2)}px`,
        );
      });

      if (shouldContinue) {
        animationFrame = requestAnimationFrame(animate);
      }
    }

    function startAnimation() {
      if (reducedMotion.matches) {
        renderReducedMotionState();
        return;
      }

      if (!animationFrame) {
        animationFrame = requestAnimationFrame(animate);
      }
    }

    function resetMagnification() {
      pointer.inside = false;
      setBaseTargets();
      startAnimation();
    }

    function handlePointerMove(event: PointerEvent) {
      if (!finePointer.matches || event.pointerType === "touch") return;

      pointer.clientX = event.clientX;
      pointer.inside = true;
      startAnimation();
    }

    function handlePointerLeave() {
      pointer.inside = false;
      setBaseTargets();
      startAnimation();
    }

    function handleResize() {
      items.forEach((item) => {
        const cssSize = Number.parseFloat(
          getComputedStyle(item.element).getPropertyValue(
            "--dock-menu-base-size",
          ),
        );

        if (Number.isFinite(cssSize) && cssSize > 0) {
          item.baseSize = cssSize;
        }
      });

      resetMagnification();
    }

    function setPressed(item: AnimatedDockItem, isPressed: boolean) {
      item.element.classList.toggle("is-pressed", isPressed);
    }

    function announceSelection(item: AnimatedDockItem) {
      const appName = item.element.dataset.app ?? "Aplicativo";

      if (item.launchTimer) {
        window.clearTimeout(item.launchTimer);
      }

      item.element.classList.remove("is-launched");

      requestAnimationFrame(() => {
        item.element.classList.add("is-launched");
      });

      item.launchTimer = window.setTimeout(() => {
        item.element.classList.remove("is-launched");
      }, 400);

      if (statusRef.current) {
        statusRef.current.textContent = `${appName} selecionado.`;
      }
    }

    const itemCleanups = items.map((item) => {
      const handlePointerDown = () => setPressed(item, true);
      const release = () => setPressed(item, false);
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key !== "Enter" && event.key !== " ") return;

        if (event.key === " ") {
          event.preventDefault();
        }

        if (!event.repeat) {
          setPressed(item, true);
        }
      };
      const handleKeyUp = (event: KeyboardEvent) => {
        if (event.key !== "Enter" && event.key !== " ") return;

        if (event.key === " ") {
          event.preventDefault();
        }

        setPressed(item, false);

        if (
          event.key === " " &&
          item.control instanceof HTMLAnchorElement
        ) {
          item.control.click();
        }
      };
      const handleClick = () => announceSelection(item);

      item.control.addEventListener("pointerdown", handlePointerDown);
      item.control.addEventListener("pointerup", release);
      item.control.addEventListener("pointercancel", release);
      item.control.addEventListener("pointerleave", release);
      item.control.addEventListener("lostpointercapture", release);
      item.control.addEventListener("keydown", handleKeyDown);
      item.control.addEventListener("keyup", handleKeyUp);
      item.control.addEventListener("blur", release);
      item.control.addEventListener("click", handleClick);

      return () => {
        item.control.removeEventListener(
          "pointerdown",
          handlePointerDown,
        );
        item.control.removeEventListener("pointerup", release);
        item.control.removeEventListener("pointercancel", release);
        item.control.removeEventListener("pointerleave", release);
        item.control.removeEventListener(
          "lostpointercapture",
          release,
        );
        item.control.removeEventListener("keydown", handleKeyDown);
        item.control.removeEventListener("keyup", handleKeyUp);
        item.control.removeEventListener("blur", release);
        item.control.removeEventListener("click", handleClick);
      };
    });

    dock.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    dock.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("resize", handleResize, { passive: true });
    finePointer.addEventListener("change", resetMagnification);
    reducedMotion.addEventListener("change", resetMagnification);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }

      items.forEach((item) => {
        if (item.launchTimer) {
          window.clearTimeout(item.launchTimer);
        }
      });
      itemCleanups.forEach((cleanup) => cleanup());
      dock.removeEventListener("pointermove", handlePointerMove);
      dock.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("resize", handleResize);
      finePointer.removeEventListener("change", resetMagnification);
      reducedMotion.removeEventListener(
        "change",
        resetMagnification,
      );
    };
  }, []);

  function togglePanel(panel: DockPanel) {
    setOpenPanel((current) => (current === panel ? null : panel));
  }

  function isDockItemActive(item: DockItem) {
    if (item.id === "inicio") return pathname === "/";
    if (item.id === "calendario") return pathname === "/roadmap";
    if (item.id === "mensagens") return pathname === "/feedback";
    if (item.id === "navegador") {
      return (
        openPanel === "navigation" ||
        navigationLinks.some(({ href }) =>
          routeMatches(pathname, href),
        )
      );
    }

    return (
      openPanel === "account" ||
      pathname === "/login" ||
      pathname === "/dashboard" ||
      pathname.startsWith("/admin")
    );
  }

  return (
    <div className="dock-menu-viewport" ref={viewportRef}>
      <nav
        className="dock-menu"
        data-dock-menu
        aria-label="Menu principal"
        ref={dockRef}
      >
        <ul className="dock-menu__list" role="list">
          {dockItems.map((item) => {
            const tooltipId = `dock-menu-tooltip-${item.id}`;
            const panelId = item.panel
              ? `dock-menu-panel-${item.panel}`
              : undefined;
            const active = isDockItemActive(item);
            const content = (
              <>
                <span className="dock-menu__tile" aria-hidden="true">
                  <DockIcon name={item.id} />
                </span>
                <span
                  className="dock-menu__tooltip"
                  id={tooltipId}
                  role="tooltip"
                >
                  {item.name}
                </span>
                <span
                  className="dock-menu__indicator"
                  aria-hidden="true"
                />
              </>
            );

            return (
              <li
                className={`dock-menu__item${active ? " is-active" : ""}`}
                data-app={item.name}
                key={item.id}
              >
                {item.href ? (
                  <Link
                    className="dock-menu__control"
                    href={item.href}
                    aria-label={`Abrir ${item.name}`}
                    aria-describedby={tooltipId}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpenPanel(null)}
                  >
                    {content}
                  </Link>
                ) : (
                  <button
                    className="dock-menu__control"
                    type="button"
                    aria-label={`Abrir ${item.name}`}
                    aria-describedby={tooltipId}
                    aria-expanded={openPanel === item.panel}
                    aria-controls={panelId}
                    aria-haspopup="menu"
                    onClick={() => item.panel && togglePanel(item.panel)}
                  >
                    {content}
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {openPanel === "navigation" ? (
        <div
          className="dock-menu__popover dock-menu__popover--navigation"
          id="dock-menu-panel-navigation"
          role="menu"
          aria-label="Páginas do site"
        >
          <p className="dock-menu__popover-title">Navegação</p>
          <div className="dock-menu__popover-grid">
            {navigationLinks.map(({ href, label }) => (
              <Link
                className="dock-menu__popover-link"
                data-active={routeMatches(pathname, href)}
                href={href}
                key={href}
                role="menuitem"
                onClick={() => setOpenPanel(null)}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}

      {openPanel === "account" ? (
        <div
          className="dock-menu__popover dock-menu__popover--account"
          id="dock-menu-panel-account"
          role="menu"
          aria-label="Conta e configurações"
        >
          <p className="dock-menu__popover-title">Configurações</p>
          {logged ? (
            <div className="dock-menu__popover-grid">
              <Link
                className="dock-menu__popover-link"
                data-active={pathname === "/dashboard"}
                href="/dashboard"
                role="menuitem"
                onClick={() => setOpenPanel(null)}
              >
                Painel
              </Link>
              {adminAllowed ? (
                <Link
                  className="dock-menu__popover-link"
                  data-active={pathname.startsWith("/admin")}
                  href="/admin"
                  role="menuitem"
                  onClick={() => setOpenPanel(null)}
                >
                  Administração
                </Link>
              ) : null}
              <button
                className="dock-menu__popover-link"
                type="button"
                role="menuitem"
                onClick={async () => {
                  setOpenPanel(null);
                  await onSignOut();
                }}
              >
                Sair
              </button>
            </div>
          ) : (
            <Link
              className="dock-menu__popover-link"
              data-active={pathname === "/login"}
              href="/login"
              role="menuitem"
              onClick={() => setOpenPanel(null)}
            >
              Entrar
            </Link>
          )}
        </div>
      ) : null}

      <p
        className="dock-menu__visually-hidden"
        data-dock-status
        aria-live="polite"
        ref={statusRef}
      />
    </div>
  );
}

function DockIcon({ name }: { name: DockItem["id"] }) {
  const sharedProps = {
    className: "dock-menu__icon",
    viewBox: "0 0 24 24",
    focusable: false,
    "aria-hidden": true,
  } as const;

  switch (name) {
    case "inicio":
      return (
        <svg {...sharedProps}>
          <path d="m3 11 9-8 9 8" />
          <path d="M5 10v10h14V10" />
          <path d="M9 20v-6h6v6" />
        </svg>
      );
    case "calendario":
      return (
        <svg {...sharedProps}>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M16 3v4M8 3v4M3 10h18" />
          <path d="M8 14h.01M12 14h.01M16 14h.01M8 17h.01M12 17h.01" />
        </svg>
      );
    case "mensagens":
      return (
        <svg {...sharedProps}>
          <path d="M21 11.5a8.4 8.4 0 0 1-9 8.5 9.7 9.7 0 0 1-4-.9L3 21l1.7-4.4A8.5 8.5 0 1 1 21 11.5Z" />
        </svg>
      );
    case "navegador":
      return (
        <svg {...sharedProps}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
        </svg>
      );
    case "configuracoes":
      return (
        <svg {...sharedProps}>
          <path d="M12.2 2h-.4a2 2 0 0 0-2 2v.2a2 2 0 0 1-1 1.7l-.4.2a2 2 0 0 1-2 0l-.2-.1a2 2 0 0 0-2.7.7l-.2.4a2 2 0 0 0 .7 2.7l.2.1a2 2 0 0 1 1 1.8v.5a2 2 0 0 1-1 1.7l-.2.1a2 2 0 0 0-.7 2.7l.2.4a2 2 0 0 0 2.7.7l.2-.1a2 2 0 0 1 2 0l.4.2a2 2 0 0 1 1 1.7v.2a2 2 0 0 0 2 2h.4a2 2 0 0 0 2-2v-.2a2 2 0 0 1 1-1.7l.4-.2a2 2 0 0 1 2 0l.2.1a2 2 0 0 0 2.7-.7l.2-.4a2 2 0 0 0-.7-2.7l-.2-.1a2 2 0 0 1-1-1.7v-.5a2 2 0 0 1 1-1.8l.2-.1a2 2 0 0 0 .7-2.7l-.2-.4a2 2 0 0 0-2.7-.7l-.2.1a2 2 0 0 1-2 0l-.4-.2a2 2 0 0 1-1-1.7V4a2 2 0 0 0-2-2Z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
  }
}

function routeMatches(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum);
}
