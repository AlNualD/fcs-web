import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Character} from "./models/character";
import { Urls } from "./urls";


@Injectable({
  providedIn: 'root'
})
export class CharacterInfoProviderService {

  constructor(private http: HttpClient) { }

  getCharactersList(userId :number) {
    return this.http.get(Urls.getUserCharacters + userId);
  }

  getCharacterInfo(characterId: number) {
    return this.http.get(Urls.getCharacterInfo + characterId)
  }



}
