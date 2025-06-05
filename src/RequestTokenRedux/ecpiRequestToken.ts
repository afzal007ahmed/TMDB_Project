import { type Action } from "@reduxjs/toolkit"
import { catchError, from, map, mergeMap, of, type Observable } from "rxjs"
import { ofType } from 'redux-observable'
import { fetchRequestToken, fetchRequestTokenFailed, fetchRequestTokenSuccess } from "./sliceRequestToken"
import axios, { AxiosError } from 'axios'

interface RequestTokenResponse {
    success: boolean;
    expires_at: string; 
    request_token: string;
  }

    
async function getRequestToken() : Promise<RequestTokenResponse >{
    try{
        const response = await axios.get('https://api.themoviedb.org/3/authentication/token/new' , 
            {
                headers : {
                    Authorization : `Bearer ${import.meta.env.VITE_API_KEY}`
                }
            }
        ); 
       return response.data
    }
    catch( err ) {
        if( axios.isAxiosError( err ) ) {
            throw new Error(err.response?.data.status_message)
        }
        throw new Error((err as AxiosError).message) ;
    }
}

const epicRequestToken = ( actions$ : Observable<Action>) => actions$.pipe(
    ofType( fetchRequestToken.type ) ,
    mergeMap(() => {
        return from(getRequestToken()).pipe(
            map(( res ) => fetchRequestTokenSuccess({token : (res as RequestTokenResponse).request_token , expires : (res as RequestTokenResponse).expires_at })) ,
            catchError(( err ) => of( fetchRequestTokenFailed( err ) ) )
        )
    }),
    catchError(( err ) => {
        return of( fetchRequestTokenFailed( err ))
    })
)

export default epicRequestToken; 