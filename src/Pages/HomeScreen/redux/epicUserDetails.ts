import type { Action } from "@reduxjs/toolkit";
import { ofType } from "redux-observable";
import { catchError, from, map, mergeMap, of, type Observable } from "rxjs";
import { fetchUserDetails, fetchUserDetailsFailed, fetchUserDetailsSuccess } from "./sliceUserDetails";
import axios, { AxiosError } from "axios";

export interface TmdbUserDetails {
    avatar: {
      gravatar: {
        hash: string;
      };
      tmdb: {
        avatar_path: string | null;
      };
    };
    id: number;
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    include_adult: boolean;
    username: string;
  }
  

async function getUserDetails() : Promise<TmdbUserDetails> {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/account?session_id=${localStorage.getItem('sessionId')}` ,{
            headers : {
                Authorization : 'Bearer ' + import.meta.env.VITE_API_KEY
            }
        })

        return response.data as TmdbUserDetails;
    } catch (error) {
        if( axios.isAxiosError( error ) ){
            throw new Error( error.response?.data.status_message ) ;
        }
        throw new Error( (error as AxiosError).message ) ;
    }
}

const epicUserDetails = ( action$ : Observable<Action>) => action$.pipe(
    ofType(fetchUserDetails.type ) ,
    mergeMap(() => {
        return from( getUserDetails()).pipe(
            map(( res : TmdbUserDetails) => fetchUserDetailsSuccess({name : res?.name , username : res.username , include_adult : res.include_adult , id : res.id.toString() , hash : res.avatar.gravatar.hash , iso_3166_1 : res.iso_3166_1 , iso_639_1 : res.iso_3166_1})),
            catchError((err) => of(fetchUserDetailsFailed(err.message))) 
        )
    }),
    catchError((err) => of(fetchUserDetailsFailed(err.message))) 
)

export default epicUserDetails ;