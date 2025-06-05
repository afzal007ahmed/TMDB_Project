import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  CastMember,
  MovieCredit,
  MovieCreditsResponse,
} from "../utils/utils";

interface InitialStateType {
  cast: CastMember[] | null;
  crew: MovieCredit[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: InitialStateType = {
  loading: false,
  cast: [],
  crew: [],
  error: null,
};

const sliceMovieCast = createSlice({
  name: "sliceMovieCast",
  initialState,
  reducers: {
    fetchCredits: (state, _action: PayloadAction<string>) => {
      state.crew = null;
      state.cast = null;
      state.error = null;
      state.loading = true;
    },
    fetchCreditsSuccess: (
      state,
      action: PayloadAction<MovieCreditsResponse>
    ) => {
      state.crew = action.payload.crew;
      state.cast = action.payload.cast;
      state.error = null;
      state.loading = false;
    },
    fetchCreditsFailed: (
      state,
      action: PayloadAction<string>
    ) => {
      state.crew = null;
      state.cast = null;
      state.error = action.payload;
      state.loading = false;
    },
    clearStateMovieCredits : ( state , _action) => {
        state.crew = null ;
        state.cast = null ;
        state.error = null ;
        state.loading = false ;
  }
  },
});


export const { fetchCredits , fetchCreditsFailed , fetchCreditsSuccess , clearStateMovieCredits } = sliceMovieCast.actions ;
export default sliceMovieCast.reducer ;
