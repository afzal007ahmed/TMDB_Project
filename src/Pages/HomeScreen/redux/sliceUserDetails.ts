import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface InitialStateType {
  loading: boolean;
  error: string | null;
  username: string | null;
  hash: string | null;
  id: string | null;
  iso_639_1: string | null;
  iso_3166_1: string | null;
  name: string | null;
  include_adult: boolean;
}

const initialState: InitialStateType = {
  loading: false,
  error: null,
  username: null,
  hash: null,
  id: null,
  iso_3166_1: null,
  iso_639_1: null,
  include_adult: false,
  name: null,
};

const sliceUserDetails = createSlice({
  name: "sliceUserDetails",
  initialState,
  reducers: {
    fetchUserDetails: (state, _action) => {
      state.loading = true;
      state.error = null;
      state.username = null;
      state.hash = null;
      state.id = null;
      state.iso_3166_1 = null;
      state.iso_639_1 = null;
      state.include_adult = false;
      state.name = null;
    },
    fetchUserDetailsSuccess: (
      state,
      action: PayloadAction<{
        username: string ;
        hash: string;
        id: string;
        iso_639_1: string ;
        iso_3166_1: string ;
        name: string;
        include_adult: boolean;
      }>
    ) => {
        state.loading = false;
      state.error = null;
      state.username = action.payload.username;
      state.hash = action.payload.hash;
      state.id = action.payload.id;
      state.iso_3166_1 = action.payload.iso_3166_1;
      state.iso_639_1 = action.payload.iso_639_1;
      state.include_adult = action.payload.include_adult;
      state.name = action.payload.name;
    },
    fetchUserDetailsFailed : ( state , action : PayloadAction<string> ) => {
        state.loading = false;
        state.error = action.payload;
        state.username = null;
        state.hash = null;
        state.id = null;
        state.iso_3166_1 = null;
        state.iso_639_1 = null;
        state.include_adult = false;
        state.name = null;
    },
    clearStateUserDetails : ( state , _action) => {
        state.loading = false;
        state.error = null;
        state.username = null;
        state.hash = null;
        state.id = null;
        state.iso_3166_1 = null;
        state.iso_639_1 = null;
        state.include_adult = false;
        state.name = null;
    }
  },
});

export const { fetchUserDetails , fetchUserDetailsFailed , fetchUserDetailsSuccess , clearStateUserDetails } = sliceUserDetails.actions ;
export default sliceUserDetails.reducer ;