export type NewsItem = {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
};

export type MatchItem = {
  id: string;
  team1: string;
  team1Logo: string;
  team2: string;
  team2Logo: string;
};

export type LocalizedText = {
  en: string;
  ru?: string;
  fr?: string;
  es?: string;
};

export type VideoItem = {
  id: string;
  src: string;
  thumbnail: string;
  title: LocalizedText;
  description: LocalizedText;
  link: string;
  date: string;
};
