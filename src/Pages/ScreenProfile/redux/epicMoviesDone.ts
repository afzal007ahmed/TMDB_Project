import axios, { AxiosError } from "axios";
import type { PersonMovieCreditsResponse } from "../utils/utils";
import { catchError, from, map, mergeMap, of, type Observable } from "rxjs";
import type { Action } from "@reduxjs/toolkit";
import { ofType } from "redux-observable";
import { fetchMoviesDone, fetchMoviesDoneFailed, fetchMoviesDoneSuccess } from "./sliceMoviesDone";

async function getMoviesDone( id : number ) : Promise<PersonMovieCreditsResponse>{
 try {
     const response = await axios.get(`https://api.themoviedb.org/3/person/${id}/movie_credits?language=en-US`, {
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



const epicMoviesDone = ( action$ : Observable<Action>) => action$.pipe(
    ofType(fetchMoviesDone.type ) ,
    mergeMap(( action ) => from( getMoviesDone(( action as ReturnType<typeof fetchMoviesDone>).payload)).pipe(
        map((res) => fetchMoviesDoneSuccess( res.cast ) ) ,
        catchError(( err) => of( fetchMoviesDoneFailed( err.message ) ) )
    )),
    catchError(( err) => of( fetchMoviesDoneFailed( err.message ) ) )
)

export default epicMoviesDone ;