import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { PersonDetails } from "../utils/utils";

interface InitialStateType {
  details: PersonDetails | null;
  loading: boolean;
  error: string | null;
}

const initialState: InitialStateType = {
  details: null,
  loading: false,
  error: null,
};

const sliceSingleProfile = createSlice({
  name: "sliceSingleProfile",
  initialState,
  reducers: {
    fetchPersonDetails: (state, _action: PayloadAction<number>) => {
      state.details = null;
      state.error = null;
      state.loading = true;
    },
    fetchPersonDetailsSuccess: (
      state,
      action: PayloadAction<PersonDetails>
    ) => {
      state.details = action.payload;
      state.error = null;
      state.loading = false;
    },
    fetchPersonDetailsFailed: (state, action: PayloadAction<string>) => {
      state.details = null;
      state.error = action.payload;
      state.loading = false;
    },
    clearStatePersonDetails: (state, _action) => {
      state.details = null;
      state.error = null;
      state.loading = false;
    },
  },
});


export const { fetchPersonDetails , fetchPersonDetailsFailed , fetchPersonDetailsSuccess , clearStatePersonDetails } = sliceSingleProfile.actions ;
export default sliceSingleProfile.reducer ;
