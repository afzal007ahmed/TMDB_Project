import axios, { AxiosError } from "axios";
import { catchError, from, map, mergeMap, of, type Observable } from "rxjs";
import type { Action } from "@reduxjs/toolkit";
import { ofType } from "redux-observable";
import type { TvAccountStates } from "../utils/utils";
import { fetchAccountStatesforRating, fetchAccountStatesforRatingFailed, fetchAccountStatesforRatingSuccess } from "./sliceAccountStatesforRating";

async function getAccountSatates(body: {
  session_id: string | null;
  media_id: number;
  guest_session_id: string | null;
}): Promise<TvAccountStates> {
  try {
    const queryParam = body.guest_session_id
      ? `guest_session_id=${body.guest_session_id}`
      : `session_id=${body.session_id}`;

    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/${body.media_id}/account_states?${queryParam}`,
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

const epicAccountStatesfoRating = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(fetchAccountStatesforRating.type),
    mergeMap((action) => {
      const { media_id, session_id , guest_sesson_id} = (
        action as ReturnType<typeof fetchAccountStatesforRating>
      ).payload;
      return from(
        getAccountSatates({ session_id: session_id, media_id: media_id , guest_session_id:guest_sesson_id })
      ).pipe(
        map((res) => fetchAccountStatesforRatingSuccess(res)),
        catchError((err) => of(fetchAccountStatesforRatingFailed(err.message)))
      );
    }),
    catchError((err) => of(fetchAccountStatesforRatingFailed(err.message)))
  );

export default epicAccountStatesfoRating;
