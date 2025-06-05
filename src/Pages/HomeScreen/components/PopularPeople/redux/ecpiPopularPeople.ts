import axios, { AxiosError } from "axios";
import type { PopularPerson } from "../utils/utils";
import { catchError, from, map, mergeMap, of, type Observable } from "rxjs";
import type { Action } from "@reduxjs/toolkit";
import { ofType } from "redux-observable";
import { fetchPopularPeople, fetchPopularPeopleFailed, fetchPopularPeopleSuccess } from "./slicePopularPeople";

async function getPopularPeople(): Promise<PopularPerson[]> {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/person/popular?language=en-US&page=1",
      {
        headers: {
          Authorization: "Bearer " + import.meta.env.VITE_API_KEY,
        },
      }
    );

    return response.data.results;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.status_message);
    }
    throw new Error((error as AxiosError).message);
  }
}

const epicPopularPeople = ( action$ : Observable<Action> ) => action$.pipe(
    ofType(fetchPopularPeople.type) ,
    mergeMap(() => from(getPopularPeople()).pipe(
        map(( res) => fetchPopularPeopleSuccess( res ) ) ,
        catchError(( err ) => of(fetchPopularPeopleFailed(err.message)))
    )),
    catchError(( err ) => of(fetchPopularPeopleFailed(err.message)))
)

export default epicPopularPeople ;