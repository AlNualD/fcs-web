import { Injectable } from '@angular/core';
import {User} from "./models/user";
import {HttpClient, HttpStatusCode} from "@angular/common/http";
import {Urls} from "./urls";
import {BehaviorSubject, Observable} from "rxjs";
import {CookieService} from "ngx-cookie-service";

interface AuthResponse {
  token:string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  get id(): number | undefined {
    return this._id;
  }
  get status(): Observable<statuses> {
    return this._status.asObservable();
  }
  get isAuth(): boolean {
    return this._isAuth;
  }
  get token(): string | undefined{
    return this._token;
  }

  private _status: BehaviorSubject<statuses> = new BehaviorSubject<statuses>(statuses.Unauthorized);

  private _isAuth : boolean = false;

  private _token:string|undefined;
  private _id:number|undefined;

  tokens : AuthResponse[] =[];

  constructor(private readonly httpClient : HttpClient,
              private readonly cookieService: CookieService,
  ) { }

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

        //set token to cookies
        this.cookieService.set("token",val.token);

        this.cookieService.set("uid", String(val.id));

        this._token = val.token;
        this._id = val.id;
        this._status.next(statuses.Authorized)},
        error: () => this._status.next(statuses.Unauthorized)
    })
  }

  public getToken() : string | void {
    if (this._token) {
      return this._token
    }
    let token = this.checkCookie('token');

    console.log("cookie " + token);

    if(token) {
      return token;
    }

    return;
  }

  private checkCookie(val : string) : string | void {
    let token = this.cookieService.get(val);

    if(token) {
      return token;
    }
    return ;
  }

  public checkAuth() : boolean {

    if(this._token) {
      return true;
    }

    let token = this.checkCookie('token');
    let uid:number = +this.checkCookie('uid');

    if(token && uid) {
      this._token = token;
      this._id = uid;
      this._status.next(statuses.Authorized);
      return true;
    }

    return false
  }

}



export enum statuses {
  Unauthorized,
  Wait,
  Authorized
}


export interface response {
  token : string
  id: number
}
