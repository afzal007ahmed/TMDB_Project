import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Review, ReviewsResponse } from "../utils/utils";

interface InitialStateType {
  reviews: Review[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: InitialStateType = {
  reviews: null,
  loading: false,
  error: null,
};

const sliceMovieReviews = createSlice({
  name: "sliceMovieReview",
  initialState,
  reducers: {
    fetchReview: (state, _action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
      state.reviews = null;
    },
    fetchReviewSuccess: (state, action: PayloadAction<ReviewsResponse>) => {
      state.loading = false;
      state.error = null;
      state.reviews = action.payload.results;
    },
    fetchReviewFailed: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.reviews = null;
    },
    clearStateMovieReviews : ( state , _action) => {
        state.loading = false;
        state.error = null;
        state.reviews = null;
    }
  }
});

export const { fetchReview , fetchReviewFailed , fetchReviewSuccess , clearStateMovieReviews } = sliceMovieReviews.actions ;
export default sliceMovieReviews.reducer
