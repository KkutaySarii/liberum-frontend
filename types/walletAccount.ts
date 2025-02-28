export interface SearchResults {
  _id: string;
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

export interface Domain {
  tokenId: string;
  name: string;
  pageContract?: string;
  expiration_date: number;
}
export interface ContentData{
  name: string;
  pageContract: string;
  status: string;
  domain: string;
  tokenId?: string;
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
  linkedBlockspace: SearchResults | null;
  owner: string;
  contractAddress: string;
}
