// Inline SVG flags — emoji flags don't render on Windows. viewBox is 3:2.

const star = (cx, cy, outer, inner = outer * 0.382) =>
  Array.from({ length: 10 }, (_, i) => {
    const r = i % 2 === 0 ? outer : inner;
    const a = (Math.PI / 5) * i - Math.PI / 2;
    return `${(cx + r * Math.cos(a)).toFixed(3)},${(cy + r * Math.sin(a)).toFixed(3)}`;
  }).join(" ");

const FLAGS = {
  NG: (
    <>
      <rect width="3" height="2" fill="#fff" />
      <rect width="1" height="2" fill="#008751" />
      <rect x="2" width="1" height="2" fill="#008751" />
    </>
  ),
  CM: (
    <>
      <rect width="1" height="2" fill="#007A5E" />
      <rect x="1" width="1" height="2" fill="#CE1126" />
      <rect x="2" width="1" height="2" fill="#FCD116" />
      <polygon points={star(1.5, 1, 0.32)} fill="#FCD116" />
    </>
  ),
  GH: (
    <>
      <rect width="3" height="0.667" fill="#CE1126" />
      <rect y="0.667" width="3" height="0.667" fill="#FCD116" />
      <rect y="1.333" width="3" height="0.667" fill="#006B3F" />
      <polygon points={star(1.5, 1, 0.3)} fill="#000" />
    </>
  ),
  KZ: (
    <>
      <rect width="3" height="2" fill="#00AFCA" />
      <rect x="0.14" y="0.1" width="0.12" height="1.8" fill="#FEC50C" opacity="0.9" />
      <circle cx="1.5" cy="0.85" r="0.3" fill="#FEC50C" />
      <path d="M0.95 1.45 Q1.5 1.15 2.05 1.45 Q1.5 1.3 0.95 1.45Z" fill="#FEC50C" />
    </>
  ),
  MA: (
    <>
      <rect width="3" height="2" fill="#C1272D" />
      <polygon points={star(1.5, 1.02, 0.42, 0.16)} fill="none" stroke="#006233" strokeWidth="0.08" strokeLinejoin="round" />
    </>
  )
};

export default function Flag({ code, label, className = "" }) {
  const flag = FLAGS[code];
  if (!flag) return null;
  return (
    <svg viewBox="0 0 3 2" className={className} role="img" aria-label={label} preserveAspectRatio="none">
      <title>{label}</title>
      {flag}
    </svg>
  );
}
