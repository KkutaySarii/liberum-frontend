export interface DomianListItem {
  id: string;
  domain: string;
  favicon: string;
  visits: number;
}

export type DomianList = DomianListItem[];
