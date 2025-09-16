export interface SvgInfo {
  flatId: string;
  url: string;
  id: string;
}

export interface SourceInfo {
  kind: string;
  course: boolean;
  id: string;
}

export interface Card {
  id: string;
  sCardId: string | null;
  sourceId: string | null;
  front: string;
  pronunciation: string | null;
  back: string;
  hint: string;
  flipped: boolean;
  loopedAt: string;
  knownAt: string | null;
  knownUntil: string | null;
  knownCount: number;
  failCount: number;
  source: SourceInfo | null;
  svg: SvgInfo | null;
}