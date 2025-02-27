export interface SearchResults {
  name: string;
  owner: string;
  nft_id: string;
  expire_date: string;
  visit_count: number;
  image_url?: string;
  linkedContractAddress: string;
  linkedContent: Content | null;
}

export interface Wallet {
  account: string;
  blockspaces: SearchResults[];
  contents: Content[];
  selectedBlockspace: SearchResults | null;
  selectedContent: Content | null;
}

export interface Blockspace {
  name: string;
  image: string;
  linkedContent: Content | null;
  owner: string;
  expiry: string;
  status: string;
}

export interface Content {
  name: string;
  image: string;
  linkedBlockspace: SearchResults | null;
  owner: string;
  contractAddress: string;
}
