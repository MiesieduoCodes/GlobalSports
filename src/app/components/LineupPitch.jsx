"use client";

import { motion } from "framer-motion";
import Flag from "@/app/components/Flag";
import { findPlayer, NATIONALITY_LABELS } from "@/lib/squad";

// Pitch markings drawn in FIFA metres (105 x 68), attacking left -> right.
function PitchLines() {
  const arc = Math.sqrt(9.15 ** 2 - 5.5 ** 2); // where the penalty arc meets the box
  return (
    <g fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="0.3">
      <rect x="0" y="0" width="105" height="68" />
      <line x1="52.5" y1="0" x2="52.5" y2="68" />
      <circle cx="52.5" cy="34" r="9.15" />
      <circle cx="52.5" cy="34" r="0.45" fill="rgba(255,255,255,0.7)" stroke="none" />
      {/* own half */}
      <rect x="0" y="13.84" width="16.5" height="40.32" />
      <rect x="0" y="24.84" width="5.5" height="18.32" />
      <circle cx="11" cy="34" r="0.4" fill="rgba(255,255,255,0.7)" stroke="none" />
      <path d={`M16.5 ${34 - arc} A9.15 9.15 0 0 1 16.5 ${34 + arc}`} />
      <rect x="-1.6" y="30.34" width="1.6" height="7.32" />
      {/* opposition half */}
      <rect x="88.5" y="13.84" width="16.5" height="40.32" />
      <rect x="99.5" y="24.84" width="5.5" height="18.32" />
      <circle cx="94" cy="34" r="0.4" fill="rgba(255,255,255,0.7)" stroke="none" />
      <path d={`M88.5 ${34 - arc} A9.15 9.15 0 0 0 88.5 ${34 + arc}`} />
      <rect x="105" y="30.34" width="1.6" height="7.32" />
      {/* corners */}
      <path d="M0 1 A1 1 0 0 0 1 0 M104 0 A1 1 0 0 0 105 1 M105 67 A1 1 0 0 0 104 68 M1 68 A1 1 0 0 0 0 67" />
    </g>
  );
}

const grass = (angle) =>
  `repeating-linear-gradient(${angle}, #1e6a38 0 9.0909%, #237a41 9.0909% 18.1818%)`;

function PlayerMarker({ player, pos, countries, index }) {
  const lastName = player.name.split(" ").slice(-1)[0];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.15 + index * 0.05, type: "spring", stiffness: 260, damping: 20 }}
      className="flex flex-col items-center"
    >
      <div className="relative">
        <div className="w-11 h-11 sm:w-14 sm:h-14 xl:w-16 xl:h-16 rounded-full border-2 border-vgold bg-vnavy overflow-hidden shadow-[0_4px_14px_rgba(0,0,0,0.45)]">
          {player.image ? (
            <img src={player.image} alt={player.name} className="w-full h-full object-cover object-top scale-110" />
          ) : (
            <div className="w-full h-full flex items-center justify-center font-bebas text-vgold text-lg">{player.number}</div>
          )}
        </div>
        <span className="absolute -top-1 -left-1.5 min-w-[20px] h-5 px-1 rounded-full bg-vgold text-vnavy font-bebas text-[13px] leading-5 text-center shadow">
          {player.number}
        </span>
        <Flag
          code={player.nationality}
          label={countries[player.nationality]}
          className="absolute -bottom-0.5 -right-2 w-[22px] h-[15px] sm:w-[26px] sm:h-[17px] rounded-[3px] ring-2 ring-vnavy shadow"
        />
      </div>
      <div className="mt-1.5 px-1.5 py-[3px] rounded-[4px] bg-vnavy/85 backdrop-blur-sm border border-white/10 text-center leading-none">
        <div className="font-barlow-condensed font-bold text-[10px] sm:text-[12px] text-vwhite whitespace-nowrap" title={player.name}>
          <span className="lg:hidden">{lastName}</span>
          <span className="hidden lg:inline">{player.name}</span>
        </div>
        <div className="font-barlow-condensed font-bold text-[9px] sm:text-[10px] tracking-[1.5px] text-vgold mt-0.5">{pos}</div>
      </div>
    </motion.div>
  );
}

/**
 * starters: [{ num, pos, x, y }] — x 0..100 across the pitch (left -> right when attacking up),
 * y 0..100 from our goal line to theirs. Rendered upright on phones, sideways from lg.
 */
export default function LineupPitch({ formation, starters, language }) {
  const countries = NATIONALITY_LABELS[language] || NATIONALITY_LABELS.en;

  return (
    <div className="relative mx-auto w-full max-w-[520px] aspect-[68/105] lg:max-w-none lg:aspect-[105/68] rounded-[16px] overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
      <div className="absolute inset-0 lg:hidden" style={{ background: grass("180deg") }} />
      <div className="absolute inset-0 hidden lg:block" style={{ background: grass("90deg") }} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(5,10,20,0.45))]" />

      <div className="absolute inset-[5%]">
        <svg viewBox="0 0 68 105" preserveAspectRatio="none" className="absolute inset-0 w-full h-full overflow-visible lg:hidden" aria-hidden="true">
          <g transform="translate(0 105) rotate(-90)"><PitchLines /></g>
        </svg>
        <svg viewBox="0 0 105 68" preserveAspectRatio="none" className="absolute inset-0 w-full h-full overflow-visible hidden lg:block" aria-hidden="true">
          <PitchLines />
        </svg>

        <img src="/logo.png" alt="" aria-hidden="true" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[14%] w-auto opacity-[0.12] pointer-events-none" />

        {starters.map((s, i) => {
          const player = findPlayer(s.num);
          if (!player) return null;
          return (
            <div
              key={s.num}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-10 [left:var(--vl)] [top:var(--vt)] lg:[left:var(--hl)] lg:[top:var(--ht)]"
              style={{ "--vl": `${s.x}%`, "--vt": `${100 - s.y}%`, "--hl": `${s.y}%`, "--ht": `${s.x}%` }}
            >
              <PlayerMarker player={player} pos={s.pos} countries={countries} index={i} />
            </div>
          );
        })}
      </div>

      <div className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded-[6px] bg-vnavy/80 border border-vgold/30 font-bebas text-[15px] tracking-[2px] text-vgold">
        {formation}
      </div>
    </div>
  );
}

export function BenchPlayer({ num, pos, language }) {
  const player = findPlayer(num);
  if (!player) return null;
  const countries = NATIONALITY_LABELS[language] || NATIONALITY_LABELS.en;
  return (
    <div className="flex items-center gap-3 bg-vnavy-card border border-white/5 rounded-[10px] p-2.5 pr-4 hover:border-vgold/30 transition-colors">
      <div className="relative shrink-0">
        <div className="w-11 h-11 rounded-full border border-vgold/40 bg-vnavy overflow-hidden">
          {player.image && <img src={player.image} alt={player.name} className="w-full h-full object-cover object-top scale-110" loading="lazy" />}
        </div>
        <Flag code={player.nationality} label={countries[player.nationality]} className="absolute -bottom-0.5 -right-1.5 w-[20px] h-[13px] rounded-[2px] ring-2 ring-vnavy-card" />
      </div>
      <div className="min-w-0">
        <div className="font-barlow-condensed font-semibold text-sm text-vwhite leading-tight truncate">
          <span className="font-bebas text-vgold mr-1.5">{player.number}</span>{player.name}
        </div>
        <div className="font-barlow-condensed text-[10px] tracking-[1.5px] uppercase text-vmuted">{pos}</div>
      </div>
    </div>
  );
}
