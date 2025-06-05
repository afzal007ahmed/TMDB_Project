import axios, { AxiosError } from "axios";
import type { PopularMovieApiResponse } from "../utils/utils";
import { catchError, from, map, mergeMap, of, type Observable } from "rxjs";
import type { Action } from "@reduxjs/toolkit";
import { ofType } from "redux-observable";
import { fetchPopularMovies2, fetchPopularMovies2Failed, fetchPopularMovies2Success } from "./slicePopularMovies";



async function getPopularMovies( page : number ) : Promise<PopularMovieApiResponse>{
  try{
      const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}` , {
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


const epicPopularMovies2 = ( action$ : Observable<Action> ) => action$.pipe(
    ofType(fetchPopularMovies2.type) ,
    mergeMap((action) => from(getPopularMovies((action as ReturnType<typeof fetchPopularMovies2>).payload)).pipe(
        map(( res ) => fetchPopularMovies2Success(res.results) ) ,
        catchError((err) => of(fetchPopularMovies2Failed(err.message))) 
    )),
    catchError((err) => of(fetchPopularMovies2Failed(err.message))) 
)

export default epicPopularMovies2 ;