import axios, { AxiosError } from "axios";
import { catchError, from, map, mergeMap, of, type Observable } from "rxjs";
import type { Action } from "@reduxjs/toolkit";
import { ofType } from "redux-observable";
import type { TvAccountStates } from "../utils/utils";
import { fetchAccountStatesTv, fetchAccountStatesTvFailed, fetchAccountStatesTvSuccess } from "./sliceAccountStates";
async function getAccountSatates(body: {
  session_id: string;
  media_id: number;
}): Promise<TvAccountStates> {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/${body.media_id}/account_states?session_id=${body.session_id}`,
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

const epicAccountStatesTv = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(fetchAccountStatesTv.type),
    mergeMap((action) => {
      const { media_id, session_id } = (
        action as ReturnType<typeof fetchAccountStatesTv>
      ).payload;
      return from(
        getAccountSatates({ session_id: session_id, media_id: media_id })
      ).pipe(
        map((res) => fetchAccountStatesTvSuccess(res)),
        catchError((err) => of(fetchAccountStatesTvFailed(err.message)))
      );
    }),
    catchError((err) => of(fetchAccountStatesTvFailed(err.message)))
  );

export default epicAccountStatesTv;
