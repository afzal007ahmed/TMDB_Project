import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface InitialStateType {
  token: string | null;
  error: string | null;
  loading: boolean;
  expires : string | null 
}

const initialState: InitialStateType = {
  token: null,
  error: null,
  loading: false,
  expires : null 
};
const sliceRequestToken = createSlice({
  name: "sliceRequestToken",
  initialState,
  reducers: {
    fetchRequestToken: (state, _action) => {
      state.error = null;
      state.loading = true;
      state.token = null;
      state.expires = null ;
    },
    fetchRequestTokenSuccess: (state, action: PayloadAction<{ token : string , expires : string}>) => {
      state.error = null;
      state.loading = false;
      state.token = action.payload.token;
      state.expires = action.payload.expires ;
    },
    fetchRequestTokenFailed: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
      state.token = null;
      state.expires = null ;
    },
    clearStateRequestToken: (state, _action) => {
      state.error = null;
      state.loading = false;
      state.token = null;
      state.expires = null ;
    },
  },
});


export const { fetchRequestToken , fetchRequestTokenFailed , fetchRequestTokenSuccess , clearStateRequestToken} = sliceRequestToken.actions;
export default sliceRequestToken.reducer ;
