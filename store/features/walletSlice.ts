import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {  Content, Wallet, SearchResults } from '@/types/walletAccount';

const initialState: Wallet = {
  account: '',
  blockspaces: [] as const,
  contents: [] as const,
  selectedBlockspace: null,
  selectedContent: null

};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setAccount: (state, action: PayloadAction<string>) => {
      state.account = action.payload;
    },
    setBlockspace: (state, action: PayloadAction<SearchResults>) => {
      state.blockspaces.push(action.payload);
    },
    setContent: (state, action: PayloadAction<Content>) => {
      state.contents.push(action.payload);
    },
    setSelectedBlockspace: (state, action: PayloadAction<SearchResults>) => {
      state.selectedBlockspace = action.payload;
    },
    setSelectedContent: (state, action: PayloadAction<Content>) => {
      state.selectedContent = action.payload;
    },
    unlinkContent: (state, action: PayloadAction<string>) => {
      const blockspaceName = action.payload;
      const blockspace = state.blockspaces.find(b => b.name === blockspaceName);
      if (blockspace) {
        blockspace.linkedContent = null;
      }
      state.selectedBlockspace = {
        ...state.selectedBlockspace!,
        linkedContent: null
      };
    },
    unlinkBlockspace: (state, action: PayloadAction<string>) => {
      const contentName = action.payload;
      const content = state.contents.find(c => c.name === contentName);
      if (content) {
        content.linkedBlockspace = null;
      }
      state.selectedContent = {
        ...state.selectedContent!,
        linkedBlockspace: null
      };
    }
  },
});

export const { setAccount, setBlockspace, setContent, setSelectedBlockspace, setSelectedContent, unlinkContent, unlinkBlockspace } = walletSlice.actions;
export default walletSlice.reducer; 