import {Component, Input, OnInit} from '@angular/core';
import {EmptySpell, Spell} from "../../services/models/spell";
import {Observable} from "rxjs";
import {Attribute} from "../../services/models/attribute";
import {EmptySkill, Skill} from "../../services/models/skill";
import {CharacterService} from "../../services/character.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {modes, RollingServiceService} from "../../services/rolling-service.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-spell-panel',
  templateUrl: './spell-panel.component.html',
  styleUrls: ['./spell-panel.component.scss']
})
export class SpellPanelComponent implements OnInit {

  _spell! : Spell;

  @Input()
  set spell(spell: Spell | null) {
    if(spell) {
      this._spell=spell
      this.spellForm.setValue(spell);
    } else {
      this._spell = EmptySpell();
      this.IsOpened=true;
      this.IsEditing=true;
    }
  }

  attr$ : Observable<Attribute[]> = new Observable<Attribute[]>();

  IsOpened : boolean = false;

  IsEditing : boolean = false

  spellForm : FormGroup = new FormGroup({
    "id": new FormControl(),
    "name":	new FormControl(null, Validators.required),
    "definition":	new FormControl(),
    "description":	new FormControl(),
    "formula":	new FormControl(),
    "lvl":	new FormControl(null, Validators.pattern("#[0-9]*")),
    "favorite":	new FormControl(false),
    "attribute":	new FormControl(null),
    "difficulty": new FormControl(null, Validators.pattern("#[0-9]*"))
  });

  constructor(private readonly characterService : CharacterService,
              private _snackBar: MatSnackBar,
              private readonly rolls : RollingServiceService)
  { }

  ngOnInit(): void {
    this.attr$ = this.characterService.attr$;
  }

  OnSpellClick() {
    this.IsOpened = !this.IsOpened;
  }

  OnSaveClick() {
    console.log("save click");
    console.log(this.spellForm.value)
    console.log("valid");
    this._spell = this.spellForm.value;
    this.spellForm.disable();
    if(this._spell) {
      this.characterService.updateSpell(this._spell.id != -1? this._spell.id : null,{
        name: this._spell.name,
        definition: this._spell.definition,
        description: this._spell.description,
        formula: this._spell.formula,
        lvl: (this._spell.lvl),
        favorite: this._spell.favorite,
        difficulty: this._spell.difficulty
      }).subscribe(() => {
//          this.characterService.ReloadSkills();

        this.spellForm.enable();
        this.IsEditing = false;
        if(this._spell.id == -1) {
          this._spell = EmptySpell();
          this.characterService.ReloadSpells();
        }
      })
      if(this._spell.attribute && this.spellForm.controls['attribute'].dirty) {
        this.characterService
          .AddAttrToSpell(this._spell.id, this._spell.attribute.id)
          .subscribe();
      }
    }
  }

  OnCancelClick() {
    this.IsEditing = false;

    if(this._spell.id == -1) {
      this.characterService.ReloadSpells();
    } else {
      this.spellForm.setValue(this._spell);
    }
  }

  OnEditClick($event : Event) {
    $event.stopPropagation();
    this.IsEditing = true;
    this.IsOpened = true;
  }

  OnDeleteClick() {
    this.spellForm.disable();
    this.characterService.deleteSpell(this._spell.id)
      .subscribe(() => this.characterService.ReloadSpells());
  }

  OnAddToFavorite($event : Event) {
    $event.stopPropagation();
    this._spell.favorite = !this._spell.favorite;
    this.characterService.ChangeFavoriteSpell(this._spell.id, this._spell.favorite);
  }

  OnRollClick($event : Event) {
    $event.stopPropagation();
    if(this._spell.formula)
      this.rolls.makeRoll(modes.normal, this._spell.formula)
        .subscribe((val) => {
          if(val.result == -1) {
            this._snackBar.open("Ошибка", "Ок");
          } else {
            this._snackBar.open("Результат: " + val.result, "Ок");
          }
        });
  }

}
