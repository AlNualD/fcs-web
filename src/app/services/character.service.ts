import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable, of, Subject, switchMap, take, takeUntil} from "rxjs";
import {Character, CharacterUpdate} from "./models/character";
import {CharacterInfoProviderService} from "./character-info-provider.service";
import {Attribute, AttributeUpdate} from "./models/attribute";
import {Skill, SkillUpdate} from "./models/skill";
import {DropboxApiService} from "./dropbox-api.service";
import {Item, ItemUpdate} from "./models/item";
import {Spell, SpellUpdate} from "./models/spell";

@Injectable({
  providedIn: 'root'
})
export class CharacterService implements OnDestroy{
  get InfoUpdates$() : Observable<UpdateInfo> {
    return this._InfoUpdates$.asObservable();
  }
  get spells$(): Observable<Spell[]> {
    return this._spells$.asObservable();
  }
  get attr$(): Observable<Attribute[]> {
    return this._attr$.asObservable();
  }
  get skills$(): Observable<Skill[]> {
    return this._skills$.asObservable();
  }
  get inventory$(): Observable<Item[]> {
    return this._inventory$.asObservable();
  }
  get img$(): Observable<string | null> {
    return this._img$.asObservable();
  }

  get money() : number {
    if(this._character.getValue()) {
      return this._character.getValue()!.money
    } else {
      return 0;
    }
  }

  private destroy$ : Subject<any> = new Subject<any>();

  private _character: BehaviorSubject<Character | null> = new BehaviorSubject<Character | null>(null);
  private _hp$ : BehaviorSubject<HpBundle> = new BehaviorSubject<HpBundle>({hpCur: 0, hpMax: 0});
  private _attr$ : BehaviorSubject<Attribute[]> = new BehaviorSubject<Attribute[]>([]);
  private _img$ : BehaviorSubject<string | null> = new BehaviorSubject<string | null>("");
  private _skills$ : BehaviorSubject<Skill[]> = new BehaviorSubject<Skill[]>([]);
  private _spells$ : BehaviorSubject<Spell[]> = new BehaviorSubject<Spell[]>([]);
  private _inventory$ : BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>([]);


  constructor(private readonly httpService: CharacterInfoProviderService,
              private readonly imageService: DropboxApiService) {
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
    }

  nextCharacter(character: Character | null) {
    this._character.next(character);
    if(character) {
      this._hp$.next({
        hpMax: character.hp_max,
        hpCur: character.hp_cur
      });

      this.httpService
        .getCharacterAttributes(character.id)
        .pipe(
          take(1),
          takeUntil(this.destroy$)
        ).subscribe({
        next: (value) => this._attr$.next(value),
        error:(err) => this._attr$.next([])
    });

      if(character.url) {
        this._img$.next(character.url);
      }
      else {
        this._img$.next("");
      }

      this.ReloadSkills();

      this.ReloadSpells();

      this.ReloadInventory();
    }
  }

  ReloadSkills(){
    this.httpService
      .getCharacterSkills(this._character.getValue()!.id)
      .pipe(take(1))
      .subscribe(
        (val) => {
          this._skills$.next(val);
        }
      );
  }

  ReloadSpells() {
    this.httpService
      .getCharacterSpells(this._character.getValue()!.id)
      .pipe(take(1))
      .subscribe(
        (val) => {
          this._spells$.next(val);
        }
      )
  }

  ReloadInventory() {
    this.httpService
      .GetCharacterInventory(this._character.getValue()!.id)
      .pipe(take(1))
      .subscribe(
        (val) => {
          this._inventory$.next(val);
        }
      );
  }

  ReloadAttributes() {
    this.httpService.getCharacterAttributes(this._character.getValue()!.id)
      .pipe(take(1))
      .subscribe(
        (val) => this._attr$.next(val)
      );
  }

  UpdateAttribute(attrId : number | null, attribute : AttributeUpdate) {
    return this.httpService.SetAttribute(this._character.getValue()!.id,attrId,attribute);
  }

  get character(): Observable<Character | null> {
    return this._character.asObservable();
  }

  public getAttributes(): Observable<Attribute[]> {
    return this._attr$.asObservable();
  }

  public getHp(): Observable<HpBundle> {
    return this._hp$.asObservable();
  }

  public setHp(hp : HpBundle) {
    this._hp$.next(hp);
    const ch = this._character.getValue()
    if(ch)
    this.httpService.UpdateCharacter(this._character.getValue()!.id, {
      name: ch.name,
      classC: ch.classC,
      race: ch.race,
      lvl: ch.lvl,
      healthDice: ch.healthDice,
      hp_max: hp.hpMax,
      hp_cur: hp.hpCur,
      alignment:	ch.alignment,
      spells_total: ch.spells_total,
      money: ch.money,
      description: ch.description,
      url:	ch.url,
      profBonus: ch.profBonus
    }).subscribe();
  }

  UpdateCharacterDescription(description : string) {
    this._character.getValue()!.description =description;
    const ch = this._character.getValue()
    if(ch)
      this.httpService.UpdateCharacter(this._character.getValue()!.id, {
        name: ch.name,
        classC: ch.classC,
        race: ch.race,
        lvl: ch.lvl,
        healthDice: ch.healthDice,
        hp_max: ch.hp_max,
        hp_cur: ch.hp_cur,
        alignment:	ch.alignment,
        spells_total: ch.spells_total,
        money: ch.money,
        description: description,
        url:	ch.url,
        profBonus: ch.profBonus
      }).subscribe();
  }

  private _InfoUpdates$ : Subject<UpdateInfo> = new Subject<UpdateInfo>();
  InfoUpdate(){
    this._InfoUpdates$.next({id: this._character.getValue()!.id,description:this._character.getValue()!.description});
  }

  updateSkill(skillId : number | null, skill : SkillUpdate) {
    return this.httpService
      .SetSkill(this._character.getValue()!.id,skillId,skill);
  }

  AddAttrToSkill(skillId : number, attrId : number) {
    return this.httpService.AddAttributeToSkill(attrId,skillId);
  }

  ChangeFavoriteSkill (skillId: number, value : boolean) {
    return this.httpService.AddSkillToFavorite(skillId, value).subscribe();
  }

  ChangeFavoriteSpell (spellId: number, value: boolean) {
    return this.httpService.AddSpellToFavorite(spellId, value).subscribe();
  }

  ChangeFavoriteItem(itemId: number, value : boolean) {
    return this.httpService.AddItemToFavorite(itemId,value).subscribe();
  }

  updateSpell(spellId:number|null, spell : SpellUpdate) {
    return this.httpService
      .SetSpell(this._character.getValue()!.id,spellId,spell);
  }

  AddAttrToSpell (spellId: number, attrId : number) {
    return this.httpService.AddAttributeToSpell(attrId,spellId);
  }

  updateItem(itemId:number | null, item : ItemUpdate) {
    return this.httpService
      .SetItem(this._character.getValue()!.id,itemId,item);
  }

  public getSkills() : Observable<Skill[]> {
    let character = this._character.getValue();
    if(character) {
      return this.httpService.getCharacterSkills(character.id);
    }
    return new Observable<Skill[]>();
  }

  deleteSkill(skillId :number) {
    return this.httpService
      .DeleteSkill(skillId);
  }

  deleteSpell(spellId: number) {
    return this.httpService
      .DeleteSpell(spellId);
  }

  deleteItem(itemId : number) {
    return this.httpService
      .DeleteItem(itemId);
  }

  deleteAttribute(attrId : number) {
    return this.httpService
      .DeleteAttribute(attrId);
  }
}

export interface HpBundle {
  hpCur : number;
  hpMax : number;
}

export interface UpdateInfo {
  id: number;
  description: string
}
