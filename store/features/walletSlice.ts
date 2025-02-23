import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WalletState {
  account: string;
}

const initialState: WalletState = {
  account: '',
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setAccount: (state, action: PayloadAction<string>) => {
      state.account = action.payload;
    },
  },
});

export const { setAccount } = walletSlice.actions;
export default walletSlice.reducer; 