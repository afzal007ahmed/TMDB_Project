import axios, { AxiosError } from "axios";
import type { PersonDetails } from "../utils/utils";
import { catchError, from, map, mergeMap, of, type Observable } from "rxjs";
import type { Action } from "@reduxjs/toolkit";
import { ofType } from "redux-observable";
import { fetchPersonDetails, fetchPersonDetailsFailed, fetchPersonDetailsSuccess } from "./sliceSingleProfile";



async function getPersonDetails( id : number ) : Promise<PersonDetails>{
 try {
    const response = axios.get(`https://api.themoviedb.org/3/person/${id}?language=en-US` , {
        headers : {
            Authorization : 'Bearer ' + import.meta.env.VITE_API_KEY
        }
    })
    return (await response).data;
 } catch (error) {
     if( axios.isAxiosError( error ) ){
        throw new Error(error.response?.data.status_message) ;
     }
     throw new Error( (error as AxiosError ).message ) ;
 }
} 


const epicPersonalDetails = ( action$ : Observable<Action>) => action$.pipe(
    ofType( fetchPersonDetails.type ),
    mergeMap((action) => from(getPersonDetails((action as ReturnType<typeof fetchPersonDetails>).payload)).pipe(
        map((res) => fetchPersonDetailsSuccess(res)) ,
        catchError((err) => of( fetchPersonDetailsFailed(err.message)))
    )),
    catchError((err) => of( fetchPersonDetailsFailed(err.message)))
)

export default epicPersonalDetails;