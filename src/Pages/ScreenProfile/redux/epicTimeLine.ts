import axios, { AxiosError } from "axios";
import type { PersonMovieCreditsResponse } from "../utils/utils";
import { catchError, from, map, mergeMap, of, type Observable } from "rxjs";
import type { Action } from "@reduxjs/toolkit";
import { ofType } from "redux-observable";
import { fetchTimeLine, fetchTimeLineFailed, fetchTimeLineSuccess } from "./sliceTimeline";

async function getTimeLine( id : number ) : Promise<PersonMovieCreditsResponse>{
 try {
     const response = await axios.get(`https://api.themoviedb.org/3/person/${id}/combined_credits?language=en-US`, {
        headers : {
            Authorization : 'Bearer ' + import.meta.env.VITE_API_KEY
        }
     })
   return response.data;

 } catch (error) {
    
    if( axios.isAxiosError(error) ) {
        throw new Error( error.response?.data.status_message ) ;
    }
    throw new Error( (error as AxiosError).message) ;
 }
}



const epicTimeLine = ( action$ : Observable<Action>) => action$.pipe(
    ofType(fetchTimeLine.type ) ,
    mergeMap(( action ) => from( getTimeLine(( action as ReturnType<typeof fetchTimeLine>).payload)).pipe(
        map((res) => fetchTimeLineSuccess( { movies : res.cast , crew : res.crew} ) ) ,
        catchError(( err) => of( fetchTimeLineFailed( err.message ) ) )
    )),
    catchError(( err) => of( fetchTimeLineFailed( err.message ) ) )
)

export default epicTimeLine ;