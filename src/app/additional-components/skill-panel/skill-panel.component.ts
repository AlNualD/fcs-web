import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {EmptySkill, Skill} from "../../services/models/skill";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Attribute} from "../../services/models/attribute";
import {CharacterService} from "../../services/character.service";
import {modes, RollingServiceService} from "../../services/rolling-service.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-skill-panel',
  templateUrl: './skill-panel.component.html',
  styleUrls: ['./skill-panel.component.scss']
})
export class SkillPanelComponent implements OnInit {


  private _id : number | null = null;
  _skill! : Skill;

  attr$ : Observable<Attribute[]> = new Observable<Attribute[]>();

  @Input()
  set skill(skill: Skill | null) {
    if(skill) {
      this._skill=skill
      this._id = skill.id;
      this.skillForm.setValue(skill);
      this.OnToggleClick();

    } else {
      this._skill = EmptySkill();
      this.IsOpened=true;
      this.IsEditing=true;
    }
  }

  CanBeTrained : FormControl = new FormControl(false);

  IsOpened : boolean = false;

  IsEditing : boolean = false

  skillForm : FormGroup = new FormGroup({
    "name" : new FormControl(null, Validators.required),
    "id": new FormControl(),
    "trainCoefficient": new FormControl(),
    "canBeTrained":	this.CanBeTrained,
    "attribute": new FormControl(),
    "value": new FormControl(null, Validators.pattern("#[0-9]*")),
    "definition":	new FormControl(),
    "description":	new FormControl(),
    "favorite":	new FormControl(),
    "trait":	new FormControl(true),
  });


  constructor(private readonly characterService : CharacterService,
              private _snackBar: MatSnackBar,
              private readonly rolls : RollingServiceService)  { }

  ngOnInit(): void {
    this.attr$ = this.characterService.attr$;
  }

  OnSkillClick() {
    this.IsOpened = !this.IsOpened;
  }

  OnSaveClick() {
    console.log("save click");
    console.log(this.skillForm.value)
      console.log("valid");
      this._skill = this.skillForm.value;
      this.skillForm.disable();
      if(this._skill) {
        this.characterService.updateSkill(this._skill.id != -1? this._skill.id : null,{
          name: this._skill.name,
          definition: this._skill.definition,
          description: this._skill.description,
          trainCoefficient: this._skill.trainCoefficient,
          canBeTrained: this._skill.canBeTrained,
          value: this._skill.value,
          favorite: this._skill.favorite,
          trait: this._skill.trait
        }).subscribe(() => {
//          this.characterService.ReloadSkills();

          this.skillForm.enable();
          this.IsEditing = false;
          if(this._skill.id == -1) {
            this._skill = EmptySkill();
            this.characterService.ReloadSkills();
          }
        })
        if(this._skill.attribute && this.skillForm.controls['attribute'].dirty) {
          this.characterService
            .AddAttrToSkill(this._skill.id, this._skill.attribute.id)
            .subscribe();
        }
      }
  }

  OnCancelClick() {
    this.IsEditing = false;

    if(this._skill.id == -1) {
      this.characterService.ReloadSkills();
    } else {
      this.skillForm.setValue(this._skill);
    }
  }

  OnEditClick($event : Event) {
    $event.stopPropagation();
    this.IsEditing = true;
    this.IsOpened = true;
  }

  OnToggleClick() {
    if(this.skillForm.controls['canBeTrained'].value == true) {
      this.skillForm.controls['trainCoefficient'].enable();
    } else {
      this.skillForm.controls['trainCoefficient'].disable();
    }
  }

  OnDeleteClick() {
    this.skillForm.disable();
    this.characterService.deleteSkill(this._skill.id)
      .subscribe(() => this.characterService.ReloadSkills());
  }

  OnAddToFavorite($event : Event) {
    $event.stopPropagation();
    this._skill.favorite = !this._skill.favorite;
    this.characterService.ChangeFavoriteSkill(this._skill.id, this._skill.favorite);
  }

  OnRollClick($event : Event) {
    $event.stopPropagation();
      const modif = this._skill.value >= 0 ? "+" : "";
      this.rolls.makeRoll(modes.normal, "1d20"+modif+this._skill.value)
        .subscribe((val) => {
          if(val.result == -1) {
            this._snackBar.open("Ошибка", "Ок");
          } else {
            this._snackBar.open("Результат: " + val.result, "Ок");
          }
        });
  }
}
