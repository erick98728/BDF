export function BackgroundFog() {
  return (
    <div className="ambient-scene" aria-hidden="true">
      <div className="ambient-scene__base" />
      <div className="ambient-scene__orb ambient-scene__orb--left fog-drift-slow" />
      <div className="ambient-scene__orb ambient-scene__orb--right fog-drift-soft" />
      <div className="ambient-scene__haze haze-drift" />
      <div className="ambient-scene__vignette" />
    </div>
  );
}
