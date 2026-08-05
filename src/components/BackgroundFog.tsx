export function BackgroundFog() {
  return (
    <div className="ambient-scene" aria-hidden="true">
      <div className="ambient-scene__base" />
      <div className="ambient-scene__orb ambient-scene__orb--left" />
      <div className="ambient-scene__orb ambient-scene__orb--right" />
      <div className="ambient-scene__haze" />
      <div className="ambient-scene__vignette" />
    </div>
  );
}
