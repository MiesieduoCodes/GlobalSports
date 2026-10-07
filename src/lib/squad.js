// First-team roster. Photos live in /public/images/players.
// category drives the squad page sections: gk | def | mid | fwd

export const POSITION_LABELS = {
  en: {
    gk: "Goalkeeper",
    cb: "Centre-Back",
    rb: "Right-Back",
    lbw: "Left-Back / Left Wing",
    mf: "Midfielder",
    mff: "Midfielder / Forward",
    w: "Winger",
    wf: "Winger / Forward",
    ws: "Winger / Striker",
    st: "Striker"
  },
  ru: {
    gk: "Вратарь",
    cb: "Центральный защитник",
    rb: "Правый защитник",
    lbw: "Левый защитник / Левый вингер",
    mf: "Полузащитник",
    mff: "Полузащитник / Нападающий",
    w: "Вингер",
    wf: "Вингер / Нападающий",
    ws: "Вингер / Форвард",
    st: "Нападающий"
  }
};

export const NATIONALITY_LABELS = {
  en: { NG: "Nigeria", CM: "Cameroon", GH: "Ghana", KZ: "Kazakhstan", MA: "Morocco" },
  ru: { NG: "Нигерия", CM: "Камерун", GH: "Гана", KZ: "Казахстан", MA: "Марокко" }
};

const img = (slug) => `/images/players/${slug}.webp`;

export const SQUAD = [
  // Goalkeepers
  { number: 45, name: "Ayodeji Akpomiemie", position: "gk", category: "gk", nationality: "NG", image: img("ayodeji-akpomiemie") },
  { number: 55, name: "Richmond Domson", position: "gk", category: "gk", nationality: "GH", image: img("richmond-domson") },

  // Defenders
  { number: 2, name: "Samson Showumi", position: "rb", category: "def", nationality: "NG", image: img("samson-showumi") },
  { number: 3, name: "Mustapha Musa", position: "cb", category: "def", nationality: "NG", image: img("mustapha-musa") },
  { number: 12, name: "Nursultan Omuraliyeu", position: "rb", category: "def", nationality: "KZ", image: img("nursultan-omuraliyeu") },
  { number: 14, name: "Solomon Maccarthy", position: "lbw", category: "def", nationality: "GH", image: img("solomon-maccarthy") },
  { number: 20, name: "Wilfred Davies", position: "rb", category: "def", nationality: "GH", image: img("wilfred-davies") },
  { number: 23, name: "Tokhtar Pakisbayev", position: "rb", category: "def", nationality: "KZ", image: img("tokhtar-pakisbayev") },
  { number: 29, name: "Yassine Arouhi", position: "rb", category: "def", nationality: "MA", image: img("yassine-arouhi") },

  // Midfielders
  { number: 4, name: "Felix Ikechukwu Nnamdi", position: "mf", category: "mid", nationality: "NG", image: img("felix-nnamdi") },
  { number: 5, name: "Jean Ngoumou Ayissi", position: "mf", category: "mid", nationality: "CM", image: img("jean-ngoumou-ayissi") },
  { number: 9, name: "Tchouangoum Sato", position: "mff", category: "mid", nationality: "CM", image: img("tchouangoum-sato") },
  { number: 18, name: "Belema George", position: "mf", category: "mid", nationality: "NG", image: img("belema-george") },

  // Forwards
  { number: 6, name: "Brandon Tanyinzeh", position: "wf", category: "fwd", nationality: "CM", image: img("brandon-tanyinzeh") },
  { number: 7, name: "Temirlan Nuralbay", position: "w", category: "fwd", nationality: "KZ", image: img("temirlan-nuralbay") },
  { number: 10, name: "Matthew Ugoamadi", position: "wf", category: "fwd", nationality: "NG", image: img("matthew-ugoamadi") },
  { number: 11, name: "Muhsin Hassan", position: "w", category: "fwd", nationality: "NG", image: img("muhsin-hassan") },
  { number: 15, name: "Daniel Bassey", position: "ws", category: "fwd", nationality: "NG", image: img("daniel-bassey") },
  { number: 16, name: "Shyngyskhan Serikbay", position: "st", category: "fwd", nationality: "KZ", image: img("shyngyskhan-serikbay") },
  { number: 19, name: "Peterpaul Nebamkia", position: "wf", category: "fwd", nationality: "CM", image: img("peterpaul-nebamkia") },
  { number: 28, name: "Yeraly Zhomartuly", position: "st", category: "fwd", nationality: "KZ", image: img("yeraly-zhomartuly") }
];

export const findPlayer = (number) => SQUAD.find((p) => p.number === number);

// Broad positions used by the admin dashboard's position dropdown
export const CATEGORY_TO_POSITION = { gk: "Goalkeeper", def: "Defender", mid: "Midfielder", fwd: "Attacker" };
const POSITION_TO_CATEGORY = Object.fromEntries(
  Object.entries(CATEGORY_TO_POSITION).map(([cat, pos]) => [pos.toLowerCase(), cat])
);

export const CATEGORY_LABELS = {
  en: { gk: "Goalkeeper", def: "Defender", mid: "Midfielder", fwd: "Forward" },
  ru: { gk: "Вратарь", def: "Защитник", mid: "Полузащитник", fwd: "Нападающий" }
};

// Roster entry -> Firestore `players` document (shape the admin dashboard edits)
export const squadDocId = (p) => `squad-${p.number}`;
export const toFirestorePlayer = (p) => ({
  name: p.name,
  position: CATEGORY_TO_POSITION[p.category],
  positionKey: p.position,
  category: p.category,
  nationality: NATIONALITY_LABELS.en[p.nationality],
  jerseyNumber: p.number,
  image: p.image
});

// Firestore document (seeded or created in admin) -> shape the squad page renders
export const fromFirestorePlayer = (id, d) => {
  const nat = (d.nationality || "").toLowerCase();
  const natCode = Object.keys(NATIONALITY_LABELS.en).find((code) =>
    nat.includes(NATIONALITY_LABELS.en[code].toLowerCase())
  );
  return {
    id,
    name: d.name || "Unknown Player",
    number: Number(d.jerseyNumber) || 0,
    image: d.image || d.imageUrl || "",
    category: d.category || POSITION_TO_CATEGORY[(d.position || "").toLowerCase()] || "mid",
    positionKey: d.positionKey || null,
    nationality: natCode || d.nationality || ""
  };
};

export const LOCAL_SQUAD = SQUAD.map((p) => ({
  id: squadDocId(p),
  name: p.name,
  number: p.number,
  image: p.image,
  category: p.category,
  positionKey: p.position,
  nationality: p.nationality
}));
