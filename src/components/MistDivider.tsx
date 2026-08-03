export function MistDivider() {
  return (
    <div className="fx-divider" aria-hidden="true">
      <span className="fx-divider__mist" />
      <span className="fx-divider__line" />
      <span className="fx-divider__mark" />
      <span className="fx-divider__satellite fx-divider__satellite--left" />
      <span className="fx-divider__satellite fx-divider__satellite--right" />
    </div>
  );
}
