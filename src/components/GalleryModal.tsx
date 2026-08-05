"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  useLayoutEffect,
  useRef,
  type MutableRefObject,
} from "react";
import { motionDurations, motionEasings } from "@/lib/motion";
import {
  GalleryVisualFrame,
  type GalleryVisualKind,
} from "./GalleryVisualFrame";
import type { GameGlyphName } from "./GameGlyph";

export type GalleryModalItem = {
  id: string;
  name: string;
  category: string;
  status: "Prévia visual" | "Em desenvolvimento";
  description: string;
  detail: string;
  icon: GameGlyphName;
  visualKind: GalleryVisualKind;
  imageUrl?: string;
  altText?: string;
};

type GalleryModalProps = {
  items: GalleryModalItem[];
  selectedIndex: number;
  onSelectedIndexChange: (index: number) => void;
  onClose: () => void;
  returnFocusRef: MutableRefObject<HTMLElement | null>;
};

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

function wrapIndex(index: number, length: number) {
  if (length <= 0) return 0;
  return (index + length) % length;
}

export function GalleryModal({
  items,
  selectedIndex,
  onSelectedIndexChange,
  onClose,
  returnFocusRef,
}: GalleryModalProps) {
  const reduceMotion = Boolean(useReducedMotion());
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const selectedIndexRef = useRef(selectedIndex);
  const itemsLengthRef = useRef(items.length);
  const changeSelectionRef = useRef(onSelectedIndexChange);
  const selected = items[selectedIndex];

  selectedIndexRef.current = selectedIndex;
  itemsLengthRef.current = items.length;
  changeSelectionRef.current = onSelectedIndexChange;

  useLayoutEffect(() => {
    const body = document.body;
    const previousModalState = body.dataset.galleryModalOpen;
    const returnFocusTarget = returnFocusRef.current;
    body.dataset.galleryModalOpen = "true";
    closeButtonRef.current?.focus({ preventScroll: true });

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        changeSelectionRef.current(
          wrapIndex(selectedIndexRef.current - 1, itemsLengthRef.current),
        );
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        changeSelectionRef.current(
          wrapIndex(selectedIndexRef.current + 1, itemsLengthRef.current),
        );
        return;
      }

      if (event.key !== "Tab") return;

      const dialog = dialogRef.current;
      if (!dialog) return;

      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(focusableSelector),
      ).filter((element) => !element.hasAttribute("disabled"));

      if (focusable.length === 0) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);

      if (previousModalState) {
        body.dataset.galleryModalOpen = previousModalState;
      } else {
        delete body.dataset.galleryModalOpen;
      }

      window.requestAnimationFrame(() => {
        returnFocusTarget?.focus({ preventScroll: true });
      });
    };
  }, [onClose, returnFocusRef]);

  if (!selected) return null;

  const previousIndex = wrapIndex(selectedIndex - 1, items.length);
  const nextIndex = wrapIndex(selectedIndex + 1, items.length);

  return (
    <motion.div
      className="gallery-modal-backdrop"
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: reduceMotion ? 0 : motionDurations.feedback,
        ease: motionEasings.standard,
      }}
      onPointerDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.div
        ref={dialogRef}
        className="gallery-modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`gallery-preview-title-${selected.id}`}
        tabIndex={-1}
        initial={reduceMotion ? false : { opacity: 0, y: 12, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 6, scale: 0.995 }}
        transition={{
          duration: reduceMotion ? 0 : motionDurations.gallery,
          ease: motionEasings.enter,
        }}
      >
        <div className="gallery-modal-shell">
          <header className="gallery-modal-header">
            <div>
              <p className="editorial-label">Preview da galeria</p>
              <h3 id={`gallery-preview-title-${selected.id}`}>
                {selected.name}
              </h3>
            </div>
            <button
              ref={closeButtonRef}
              type="button"
              className="gallery-modal-close"
              onClick={onClose}
              aria-label="Fechar preview"
            >
              ×
            </button>
          </header>

          <div className="gallery-modal-media">
            <AnimatePresence initial={false} mode="sync">
              <motion.div
                key={selected.id}
                initial={reduceMotion ? false : { opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{
                  duration: reduceMotion ? 0 : motionDurations.feedback,
                  ease: motionEasings.standard,
                }}
              >
                <GalleryVisualFrame
                  kind={selected.visualKind}
                  icon={selected.icon}
                  label={selected.category}
                  status={selected.status}
                  size="modal"
                  imageUrl={selected.imageUrl}
                  altText={selected.altText || selected.name}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <AnimatePresence initial={false} mode="sync">
            <motion.dl
              key={`${selected.id}-copy`}
              className="gallery-modal-copy"
              initial={reduceMotion ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -2 }}
              transition={{
                duration: reduceMotion ? 0 : motionDurations.feedback,
                ease: motionEasings.standard,
              }}
            >
              <div>
                <dt>Categoria</dt>
                <dd>{selected.category}</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>{selected.status}</dd>
              </div>
              <div>
                <dt>Descrição</dt>
                <dd>{selected.description}</dd>
              </div>
              <div>
                <dt>Observação</dt>
                <dd>{selected.detail}</dd>
              </div>
            </motion.dl>
          </AnimatePresence>

          <footer className="gallery-modal-footer">
            <span className="gallery-modal-position" aria-live="polite">
              {String(selectedIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </span>
            <div className="gallery-modal-navigation">
              <button
                type="button"
                onClick={() => onSelectedIndexChange(previousIndex)}
                aria-label={`Abrir item anterior: ${items[previousIndex]?.name ?? "item anterior"}`}
              >
                ← Anterior
              </button>
              <button
                type="button"
                onClick={() => onSelectedIndexChange(nextIndex)}
                aria-label={`Abrir próximo item: ${items[nextIndex]?.name ?? "próximo item"}`}
              >
                Próximo →
              </button>
            </div>
          </footer>
        </div>
      </motion.div>
    </motion.div>
  );
}
