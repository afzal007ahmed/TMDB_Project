import type { Action } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { ofType } from "redux-observable";
import { catchError, from, map, mergeMap, of, type Observable } from "rxjs";
import {
  fetchAddtoWatchlist,
  fetchAddtoWatchlistFailed,
  fetchAddtoWatchlistSuccess,
} from "./sliceAddtoWatchlist";

async function addToWatchlist(body: {
  session_id: string;
  id: string;
  media_id: number;
  media_type: string;
  watchlist: boolean;
}): Promise<string> {
  try {
    const response = await axios.post(`https://api.themoviedb.org/3/account/${body.id}/watchlist?session_id=${body.session_id}`, {
         media_type : body.media_type,
         media_id : body.media_id ,
         watchlist : body.watchlist
    } ,
         {
      headers: {
        Authorization: "Bearer " + import.meta.env.VITE_API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.status_message);
    }
    throw new Error((error as AxiosError).message);
  }
}

const epicaddToWatchlist = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(fetchAddtoWatchlist.type),
    mergeMap((action) => {
      const { id, watchlist, media_type, media_id, session_id } = (
        action as ReturnType<typeof fetchAddtoWatchlist>
      ).payload;
      return from(
        addToWatchlist({
          session_id: session_id,
          id: id,
          watchlist: watchlist,
          media_id: media_id,
          media_type: media_type,
        })
      ).pipe(
        map(() => fetchAddtoWatchlistSuccess("success")),
        catchError((err) => of(fetchAddtoWatchlistFailed(err.message)))
      );
    }),
    catchError((err) => of(fetchAddtoWatchlistFailed(err.message)))
  );


  export default epicaddToWatchlist ;
