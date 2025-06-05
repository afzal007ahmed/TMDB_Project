import axios, { AxiosError } from "axios";
import { catchError, from, map, mergeMap, of, type Observable } from "rxjs";
import type { Action } from "@reduxjs/toolkit";
import { ofType } from "redux-observable";
import { fetchTvDetails, fetchTvDetailsFailed, fetchTvDetailsSuccess } from "./sliceTvDetails";
import type { TVSeriesDetails } from "../utils/utils";

async function getTvDetails(id : string) : Promise<TVSeriesDetails>{
  try{
      const response = await axios.get(`https://api.themoviedb.org/3/tv/${id}?language=en-US` , {
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


const epicTvDetails = ( action$ : Observable<Action> ) => action$.pipe(
    ofType(fetchTvDetails.type) ,
    mergeMap((action) => from(getTvDetails((action as ReturnType<typeof fetchTvDetails>).payload)).pipe(
        map(( res ) => fetchTvDetailsSuccess(res) ) ,
        catchError((err) => of(fetchTvDetailsFailed(err.message))) 
    )),
    catchError((err) => of(fetchTvDetailsFailed(err.message))) 
)

export default epicTvDetails ;