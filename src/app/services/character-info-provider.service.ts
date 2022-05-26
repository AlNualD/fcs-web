import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Character, CharacterGet, CharacterUpdate} from "./models/character";
import { Urls } from "./urls";
import {Attribute, AttributeUpdate} from "./models/attribute";
import {Observable} from "rxjs";
import {Skill, SkillUpdate} from "./models/skill";
import {Spell, SpellUpdate} from "./models/spell";
import {Item, ItemUpdate} from "./models/item";
import {AuthService} from "./auth.service";

interface AuthRequest {
  login : string;
  password: string;
}

interface AuthResponse {

}

@Injectable({
  providedIn: 'root'
})
export class CharacterInfoProviderService {

  requestOptions = {
    headers: new HttpHeaders({
      'Authorization' : "bearer " + this.authService.getToken()!
    }),
  }
  constructor(private http: HttpClient,
              private readonly authService : AuthService
  ) {
  }

  AddCharacterPictureLink(id:number, url:string) {
    return this.http.put(Urls.addPicture + id + "&pic_url=" + url, {});
  }

  getCharactersList(userId :number) {
    console.log("userId " + userId);
    return this.http.get(Urls.getUserCharacters + userId, this.requestOptions);
  }

  getCharacterInfo(characterId: number) {
    return this.http.get<CharacterGet>(Urls.getCharacterInfo + characterId, this.requestOptions)
  }

  getCharacterAttributes(id: number) : Observable<Attribute[]> {
    return this.http.get<Attribute[]>(Urls.getCharacterAttributes + id);
  }

  getCharacterSkills(characterId: number) : Observable<Skill[]> {
    return this.http.get<Skill[]>(Urls.getCharacterSkills + characterId);
  }

  getCharacterSpells(characterId: number) : Observable<Spell[]> {
    return this.http.get<Spell[]>(Urls.getCharacterSpells + characterId);
  }

  GetCharacterInventory(characterId: number) : Observable<Item[]> {
    return this.http.get<Item[]>(Urls.getCharacterInventory + characterId);
  }

  UpdateCharacter(id : number | null, character : CharacterUpdate) : Observable<any> {
    if(id) {
      return this.UpdateCharacterInfo(id, character);
    } else  {
      return this.CreateCharacter(character);
    }
  }

  private UpdateCharacterInfo(id : number, character : CharacterUpdate) : Observable<any> {
    return this.http.put(Urls.updateCharacter + id, character);
  }

  private CreateCharacter(character : CharacterUpdate) : Observable<any> {
    return this.http.post(Urls.createCustomCharacter + this.authService.id,character);
  }

  SetAttribute(characterId:number, attributeId : number | null, attribute : AttributeUpdate) : Observable<any> {
    if(attributeId) {
        return this.UpdateAttribute(attributeId,attribute);
    }
    return this.CreateAttribute(characterId,attribute);
  }

  private CreateAttribute(characterId: number, attr : AttributeUpdate) : Observable<any> {
    return this.http.post(Urls.createAttribute + characterId, attr);
  }

  private UpdateAttribute(attributeId:number, attr : AttributeUpdate) : Observable<any> {
    return this.http.put(Urls.updateAttribute + attributeId, attr);
  }

  DeleteAttribute(attributeId :number) {
    return this.http.delete(Urls.deleteAttribute + attributeId);
  }

  SetSkill(characterId:number, skillId : number | null, skill : SkillUpdate) : Observable<any> {
    if(skillId) {
      return this.UpdateSkill(skillId,skill);
    }
    return this.CreateSkill(characterId,skill);
  }

  private CreateSkill(characterId: number, skill : SkillUpdate) : Observable<any> {
    return this.http.post(Urls.createSkill + characterId, skill);
  }

  private UpdateSkill(skillId:number, skill : SkillUpdate) : Observable<any> {
    return this.http.put(Urls.updateSkill + skillId, skill);
  }

  AddAttributeToSkill(attributeId : number, skillId : number) : Observable<any> {
    return this.http.put(Urls.addAttributeToSkill + skillId + "&attribute_id=" + attributeId, null);
  }

  AddSkillToFavorite(skillId : number, isFavorite : boolean) : Observable<any> {
    return this.http.put(Urls.addToFavoriteSkill + skillId + "&is_favorite=" + isFavorite, null);
  }

  DeleteSkill(skillId : number) : Observable<any> {
    return this.http.delete(Urls.deleteSkill + skillId);
  }

  SetSpell(characterId:number, spellId : number | null, spell : SpellUpdate) : Observable<any> {
    if(spellId) {
      this.http.delete(Urls.deleteSpell+spellId).subscribe();
    }
    return this.CreateSpell(characterId,spell);
  }

  private CreateSpell(characterId: number, spell : SpellUpdate) : Observable<any> {
    return this.http.post(Urls.createSpell + characterId, spell);
  }

  AddAttributeToSpell(attributeId : number, spellId : number) : Observable<any> {
    return this.http.put(Urls.addAttributeToSpell + spellId + "&attribute_id=" + attributeId, null);
  }

  AddSpellToFavorite(spellId : number, isFavorite : boolean) : Observable<any> {
    return this.http.put(Urls.addToFavoriteSpell + spellId + "&is_favorite=" + isFavorite, null);
  }

  DeleteSpell(spellId : number) : Observable<any> {
    return this.http.delete(Urls.deleteSpell + spellId);
  }

  SetItem(characterId:number, itemId : number | null, item : ItemUpdate) : Observable<any> {
    if(itemId) {
      return this.UpdateItem(itemId,item);
    }
    return this.CreateItem(characterId,item);
  }

  private CreateItem(characterId: number, item : ItemUpdate) : Observable<any> {
    return this.http.post(Urls.createItem + characterId, item);
  }

  private UpdateItem (itemId:number, item : ItemUpdate) : Observable<any> {
    return this.http.put(Urls.updateItem + itemId, item);
  }

  AddItemToFavorite(itemId : number, isFavorite : boolean) : Observable<any> {
    return this.http.put(Urls.addToFavoriteItem + itemId + "&is_favorite="+ isFavorite, null);
  }

  DeleteItem(itemId : number) : Observable<any> {
    return this.http.delete(Urls.deleteItem + itemId);
  }
}
