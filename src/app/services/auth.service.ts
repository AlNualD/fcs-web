import { Injectable } from '@angular/core';
import {User} from "./models/user";
import {HttpClient, HttpHeaders, HttpParams, HttpStatusCode} from "@angular/common/http";
import {Urls} from "./urls";
import {BehaviorSubject, delay, Observable, of, timer} from "rxjs";

interface AuthResponse {
  token:string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  get status(): Observable<statuses> {
    return this._status.asObservable();
  }
  get isAuth(): boolean {
    return this._isAuth;
  }
  get token(): string | undefined{
    return this._token;
  }

  private set token(token) {
    this._token = token;
  }

  private _status: BehaviorSubject<statuses> = new BehaviorSubject<statuses>(statuses.Unauthorized);

  private _isAuth : boolean = false;

  private _token:string|undefined;

  tokens : AuthResponse[] =[];

  constructor(private readonly httpClient : HttpClient) { }

  public requestRegister(user : User) {

    console.log("register");

    this._status.next(statuses.Wait);
    this.httpClient.post(Urls.register,user,{observe:'response'})
      .subscribe((val) => {
        if(val.status == HttpStatusCode.Ok)
      this._status.next(statuses.Unauthorized);
    })
  }

  public authUser(login :string, password : string) {
    console.log("auth " + login+ " " + password);
    this._status.next(statuses.Wait);
    const body = {login: login, password: password}
    this.httpClient
      .post<response>(Urls.auth,body)
      .subscribe( {
        next:(val: response) => {
        console.log("auth " + val.token);

        this._token = val.token;
        this._status.next(statuses.Authorized)},
        error: () => this._status.next(statuses.Unauthorized)
    })


  }


}



export enum statuses {
  Unauthorized,
  Wait,
  Authorized
}


export interface response {
  token : string
}
