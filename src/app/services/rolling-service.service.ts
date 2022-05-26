import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Urls} from "./urls";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RollingServiceService {

  constructor(private http: HttpClient,
              private readonly authService : AuthService
  ) {

  }

  makeRoll(mode : modes, formula : string) : Observable<RollingAnswer> {
    var regex = new RegExp("^[1-9]\\d*d[1-9]\\d*([+|-][1-9]\\d*)?");
    if(regex.test(formula)) {
      var amount = formula.substring(0,formula.indexOf("d"))
      var pos = formula.indexOf("+");
      if(pos != -1) {
        var dice = formula.substring(formula.indexOf("d") + 1, pos);
        var modif = formula.substring(pos + 1);
        return this.makeRollRequest(mode.valueOf(),amount,dice,modif);
      }
      pos = formula.indexOf("-");
      if(pos != -1) {
        var dice = formula.substring(formula.indexOf("d") + 1, pos);
        var modif = formula.substring(pos);
        return this.makeRollRequest(mode.valueOf(),amount,dice,modif);
      }

      return this.makeRollRequest(mode.valueOf(),amount,formula.substring(formula.indexOf("d") + 1),"0");
    }

    return of({result: -1, rolls: []});
  }

  private makeRollRequest(mode : number, amount : string, dice : string, modif : string) : Observable<RollingAnswer>{
    return this.http.get<RollingAnswer>(Urls.roll + `${mode};${amount};${dice};${modif}`);
  }
}

export interface RollingAnswer {
  result : number,
  rolls : number[]
}

export enum modes {
  disadvantage = -1,
  normal,
  advantage
}
