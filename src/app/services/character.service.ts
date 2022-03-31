import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Character} from "./models/character";

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private _character : BehaviorSubject<Character| null> = new BehaviorSubject<Character | null>(null);

  constructor() { }

  nextCharacter(character: Character | null) {
    this._character.next(character);
  }

  get character() : Observable<Character | null> {
    return this._character.asObservable();
  }

}
