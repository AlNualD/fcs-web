import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import {Character, CharacterUpdate} from "./models/character";
import {HttpClient} from "@angular/common/http";
import {Urls} from "./urls";
import {Observable, Subject, switchMap, take, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CharacterCreateService {

  private isCreated$ : Subject<boolean> = new Subject<boolean>();

  constructor(
    private readonly userInfo : AuthService,
    private readonly httpClient : HttpClient
  ) { }

  createCharacter(character : Character) {
    this.httpClient.post(Urls.createCustomCharacter + this.userInfo.id,character)
      .pipe(
        tap(()=> this.isCreated$.next(true)),
        take(1)
      );
  }

  createDndCharacter(character : CharacterUpdate) : Observable<boolean> {
    this.httpClient
      .post<Character>(Urls.createDndCharacter1+this.userInfo.id,character)
      .pipe(
        switchMap(
          (val) => this.httpClient
            .put(Urls.createDndCharacter2 + val.id + "&race=" + character.race + "&cclass=" + character.classC,null)
            .pipe(
              tap(()=>this.isCreated$.next(true)),
              take(1)
            )
        ),
        take(1)
      ).subscribe(() => this.isCreated$.next(true));
    return this.isCreated$.asObservable();
  }

  getRaces() : Observable<string[]> {
    return this.httpClient.get<string[]>(Urls.getDndRaces);
  }

  getClasses() : Observable<string[]> {
    return this.httpClient.get<string[]>(Urls.getDndClasses);
  }

  isCreatedStatus$() : Observable<boolean> {
    return this.isCreated$.asObservable();
  }
}
