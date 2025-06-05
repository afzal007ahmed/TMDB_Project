import axios, { AxiosError } from "axios";
import type { TmdbPersonResponse } from "../utils/utils";
import { catchError, from, map, mergeMap, of, type Observable } from "rxjs";
import type { Action } from "@reduxjs/toolkit";
import { ofType } from "redux-observable";
import { fetchPeople, fetchPeopleFailed, fetchPeopleSuccess } from "./slicePeople";


async function getPeople(page:number) : Promise<TmdbPersonResponse>{
  try{
      const response = await axios.get(`https://api.themoviedb.org/3/person/popular?language=en-US&page=${page}` , {
        headers : {
           Authorization :  'Bearer '+ import.meta.env.VITE_API_KEY
        }
      });
      return  response.data ; 
  }
  catch(err) {
       if( axios.isAxiosError( err ) ) {
         throw new Error( err.response?.data.status_message ) ;
       }
       throw new Error( (err as AxiosError ).message ) ;
  }
}


const epicPeople = ( action$ : Observable<Action> ) => action$.pipe(
    ofType(fetchPeople.type) ,
    mergeMap((action) => from(getPeople((action as ReturnType<typeof fetchPeople>).payload)).pipe(
        map(( res ) => fetchPeopleSuccess(res.results) ) ,
        catchError((err) => of(fetchPeopleFailed(err.message))) 
    )),
    catchError((err) => of(fetchPeopleFailed(err.message))) 
)

export default epicPeople ;