import axios, { AxiosError } from "axios";
import type { UpcomingMovieResponse } from "../utils/utils";
import { catchError, from, map, mergeMap, of, type Observable } from "rxjs";
import type { Action } from "@reduxjs/toolkit";
import { ofType } from "redux-observable";
import { fetchUpcomingMovies2, fetchUpcomingMovies2Failed, fetchUpcomingMovies2Success } from "./sliceUpcomingMovies";


async function getUpcomingMovies(page:number) : Promise<UpcomingMovieResponse>{
  try{
      const response = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${page}` , {
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


const epicUpcomingMovies2 = ( action$ : Observable<Action> ) => action$.pipe(
    ofType(fetchUpcomingMovies2.type) ,
    mergeMap((action) => from(getUpcomingMovies((action as ReturnType<typeof fetchUpcomingMovies2>).payload)).pipe(
        map(( res ) => fetchUpcomingMovies2Success(res.results) ) ,
        catchError((err) => of(fetchUpcomingMovies2Failed(err.message))) 
    )),
    catchError((err) => of(fetchUpcomingMovies2Failed(err.message))) 
)

export default epicUpcomingMovies2 ;