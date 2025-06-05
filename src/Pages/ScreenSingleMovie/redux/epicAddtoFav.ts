import type { Action } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { ofType } from "redux-observable";
import { catchError, from, map, mergeMap, of, type Observable } from "rxjs";
import {
  fetchAddtoFav,
  fetchAddtoFavFailed,
  fetchAddtoFavSuccess,
} from "./sliceAddtoFav";

async function addToFav(body: {
  session_id: string;
  id: string;
  media_id: number;
  media_type: string;
  favorite: boolean;
}): Promise<string> {
  try {
    const response = await axios.post(`https://api.themoviedb.org/3/account/${body.id}/favorite?session_id=${body.session_id}`, {
         media_type : body.media_type,
         media_id : body.media_id ,
         favorite : body.favorite
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

const epicAddtoFav = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(fetchAddtoFav.type),
    mergeMap((action) => {
      const { id, favorite, media_type, media_id, session_id } = (
        action as ReturnType<typeof fetchAddtoFav>
      ).payload;
      return from(
        addToFav({
          session_id: session_id,
          id: id,
          favorite: favorite,
          media_id: media_id,
          media_type: media_type,
        })
      ).pipe(
        map(() => fetchAddtoFavSuccess("success")),
        catchError((err) => of(fetchAddtoFavFailed(err.message)))
      );
    }),
    catchError((err) => of(fetchAddtoFavFailed(err.message)))
  );


  export default epicAddtoFav ;
