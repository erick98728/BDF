import type { ButtonHTMLAttributes, ReactNode } from "react";
import { CiridaeButton } from "./CiridaeButton";

type CiridaeSubmitButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> & {
  children: ReactNode;
  loading?: boolean;
  loadingLabel?: ReactNode;
};

export function CiridaeSubmitButton({ children, loading = false, loadingLabel = "PROCESSING", disabled, ...props }: CiridaeSubmitButtonProps) {
  return (
    <CiridaeButton type="submit" variant="accent" disabled={disabled || loading} aria-busy={loading} {...props}>
      {loading ? loadingLabel : children}
    </CiridaeButton>
  );
}
