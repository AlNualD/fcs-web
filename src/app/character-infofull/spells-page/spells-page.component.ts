import { Component, OnInit } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Spell} from "../../services/models/spell";
import {CharacterService} from "../../services/character.service";

@Component({
  selector: 'app-spells-page',
  templateUrl: './spells-page.component.html',
  styleUrls: ['./spells-page.component.scss']
})
export class SpellsPageComponent implements OnInit {

  showFavorites : boolean = false;

  isEmpty : boolean = false;

  addSpell : boolean = false;

  allSpells: Spell[] = [];
  curSpell$ : Subject<Spell> = new Subject<Spell>();

  spells$ : Subject<Spell[]> = new Subject<Spell[]>();

  constructor(private readonly characterService : CharacterService) { }

  ngOnInit(): void {
    this.characterService.spells$.subscribe(
      (val) => {
        if(val.length == 0) {
          this.isEmpty = false;
        }
        this.showFavorites = false;
        this.spells$.next(val);
        this.allSpells = val;
        this.addSpell = false;
      });
  }

  OnSkillClick(spell : Spell) {
    this.curSpell$.next(spell)
  }

  ShowFavorites() {
    this.showFavorites = !this.showFavorites;
    if(this.showFavorites) {
      this.spells$.next(this.allSpells.filter((spell) => spell.favorite));
    } else {
      this.spells$.next(this.allSpells);
    }
  }

  AddSpell(){
    this.addSpell = true;
  }
}
