import axios, { AxiosError } from "axios";
import type { ReviewsResponse } from "../utils/utils";
import { catchError, from, map, mergeMap, of, type Observable } from "rxjs";
import type { Action } from "@reduxjs/toolkit";
import { ofType } from "redux-observable";
import { fetchTvReviews, fetchTvReviewsFailed, fetchTvReviewsSuccess } from "./sliceTvReviews";

async function getTvReviews(id: string): Promise<ReviewsResponse> {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}/reviews?language=en-US&page=1`,
      {
        headers: {
          Authorization: "Bearer " + import.meta.env.VITE_API_KEY,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.status_message);
    }
    throw new Error((error as AxiosError).message);
  }
}

const epicTvReviews = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(fetchTvReviews.type),
    mergeMap((action) =>
      from(
        getTvReviews((action as ReturnType<typeof fetchTvReviews>).payload)
      ).pipe(
        map((res) => fetchTvReviewsSuccess(res)),
        catchError((err) => of(fetchTvReviewsFailed(err.message)))
      )
    ),
    catchError((err) => of(fetchTvReviewsFailed(err.message)))
  );

export default epicTvReviews;
