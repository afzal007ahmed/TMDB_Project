import axios, { AxiosError } from "axios";
import type { TmdbResponse } from "../utils/utils";
import { catchError, from, map, mergeMap, of, type Observable } from "rxjs";
import type { Action } from "@reduxjs/toolkit";
import { ofType } from "redux-observable";
import { fetchTv, fetchTvFailed, fetchTvSuccess } from "./sliceTv";


async function getTv(body : {page:number , category : string }) : Promise<TmdbResponse>{
  try{
      const response = await axios.get(`https://api.themoviedb.org/3/tv/${body.category}?language=en-US&page=${body.page}` , {
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


const epicTv = ( action$ : Observable<Action> ) => action$.pipe(
    ofType(fetchTv.type) ,
    mergeMap((action) => from(getTv({ page : ( action as ReturnType<typeof fetchTv>).payload.page , category : ( action as ReturnType<typeof fetchTv>).payload.category })).pipe(
        map(( res ) => fetchTvSuccess(res.results) ) ,
        catchError((err) => of(fetchTvFailed(err.message))) 
    )),
    catchError((err) => of(fetchTvFailed(err.message))) 
)

export default epicTv ;