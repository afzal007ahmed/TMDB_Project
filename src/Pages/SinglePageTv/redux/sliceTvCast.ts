import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CastMember, CrewMember, TVCredits } from "../utils/utils";

interface InitialStateType {
  cast: CastMember[] | null;
  crew: CrewMember[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: InitialStateType = {
  loading: false,
  cast: [],
  crew: [],
  error: null,
};

const sliceTvCast = createSlice({
  name: "sliceTvCast",
  initialState,
  reducers: {
    fetchTvCast: (state, _action: PayloadAction<string>) => {
      state.crew = null;
      state.cast = null;
      state.error = null;
      state.loading = true;
    },
    fetchTvCastSuccess: (
      state,
      action: PayloadAction<TVCredits>
    ) => {
      state.crew = action.payload.crew;
      state.cast = action.payload.cast;
      state.error = null;
      state.loading = false;
    },
    fetchTvCastFailed: (
      state,
      action: PayloadAction<string>
    ) => {
      state.crew = null;
      state.cast = null;
      state.error = action.payload;
      state.loading = false;
    },
    clearStateTvCast : ( state , _action) => {
        state.crew = null ;
        state.cast = null ;
        state.error = null ;
        state.loading = false ;
  }
  },
});


export const { fetchTvCast , fetchTvCastFailed , fetchTvCastSuccess , clearStateTvCast } = sliceTvCast.actions ;
export default sliceTvCast.reducer ;
