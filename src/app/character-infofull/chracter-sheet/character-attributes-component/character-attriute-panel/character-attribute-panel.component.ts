import {Component, Input, OnInit} from '@angular/core';
import {Attribute, EmptyAttribute} from "../../../../services/models/attribute";
import {modes, RollingServiceService} from "../../../../services/rolling-service.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Observable} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CharacterService} from "../../../../services/character.service";

@Component({
  selector: 'app-character-attriute-panel',
  templateUrl: './character-attribute-panel.component.html',
  styleUrls: ['./character-attribute-panel.component.scss']
})
export class CharacterAttributePanelComponent implements OnInit {

  @Input()
  IsEditing! : Observable<boolean>;

  @Input()
  set attribute(attribute : Attribute | null) {
    if(attribute){
      this._attribute = attribute;
      this.attributeForm.controls['name'].setValue(attribute.name);
      this.attributeForm.controls['amount'].setValue(attribute.amount);
      this.attributeForm.controls['trainedSaveRoll'].setValue(attribute.trainedSaveRoll)
    } else {
      this._attribute = EmptyAttribute();
    }
  }

  _attribute! : Attribute

  constructor(private readonly rolls : RollingServiceService,
              private _snackBar: MatSnackBar,
              private readonly characterService : CharacterService) { }

  ngOnInit(): void {
  }

  attributeForm = new FormGroup({
    "name" : new FormControl(null, Validators.required),
    "amount" : new FormControl(null, [Validators.required,Validators.pattern("^[0-9]*")]),
    "trainedSaveRoll" : new FormControl(false)
  });

  OnRollClick() {
    const modify = this._attribute.modification >= 0 ? "+" + this._attribute.modification : this._attribute.modification;
    this.rolls.makeRoll(modes.normal, "1d20" + modify).subscribe((val) => {
      if(val.result == -1) {
        this._snackBar.open("Ошибка", "Ок");
      } else {
        this._snackBar.open("Результат: " + val.result, "Ок");
      }
    });
  }

  OnSaveClick($event : Event) {
    $event.stopPropagation();

    if(this.attributeForm.valid) {
      const attr = this.attributeForm.value;
      this.characterService.UpdateAttribute(this._attribute.id == -1? null : this._attribute.id,{
        name: attr.name,
        amount: attr.amount,
        trainedSaveRoll: attr.trainedSaveRoll
      }).subscribe(
        (val) => {
          this._snackBar.open("Сохранен атрибут ", "ок");
          this.characterService.ReloadAttributes();
        }
      )
    }
  }

  OnDeleteClick($event : Event) {
    $event.stopPropagation();
    if(this._attribute.id)
    this.characterService
      .deleteAttribute(this._attribute.id)
      .subscribe(() => this.characterService.ReloadAttributes());
  }

}
