import {Component, Input, OnInit} from '@angular/core';
import {EmptyItem, Item} from "../../services/models/item";
import {CharacterService} from "../../services/character.service";
import {EmptySkill, Skill} from "../../services/models/skill";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {Attribute} from "../../services/models/attribute";
import {MatSnackBar} from "@angular/material/snack-bar";
import {modes, RollingServiceService} from "../../services/rolling-service.service";

@Component({
  selector: 'app-item-panel',
  templateUrl: './item-panel.component.html',
  styleUrls: ['./item-panel.component.scss']
})
export class ItemPanelComponent implements OnInit {
  @Input()
  _item! : Item;

  @Input()
  set item(item: Item | null) {
    if(item) {
      this._item=item;
      this.itemForm.setValue(item);
    } else {
      this._item = EmptyItem();
      this.IsOpened=true;
      this.IsEditing=true;
    }
  }

  IsOpened:boolean = false;
  IsEditing : boolean = false

  itemForm : FormGroup = new FormGroup({
    "name" : new FormControl(null, Validators.required),
    "weight" : new FormControl(null, Validators.pattern("[0-9]*")),
    "favorite" : new FormControl(false),
    "formula" : new FormControl(null),
    "definition" : new FormControl(null),
    "id" : new FormControl()
  })

  constructor(private readonly characterService : CharacterService,
              private _snackBar: MatSnackBar,
              private readonly rolls : RollingServiceService
  ) { }

  ngOnInit(): void {}

  OnSkillClick() {
    this.IsOpened = !this.IsOpened;
  }

  OnSaveClick() {
    console.log("save click");
    console.log(this.itemForm.value)
    console.log("valid");
    this._item = this.itemForm.value;
    this.itemForm.disable();
    if(this._item) {
      this.characterService.updateItem(this._item.id != -1? this._item.id : null,{
        name: this._item.name,
        definition: this._item.definition,
        weight:	this._item.weight,
        formula:	this._item.formula ? this._item.formula : "",
        favorite:	this._item.favorite
      }).subscribe(() => {
        this.itemForm.enable();
        this.IsEditing = false;
        if(this._item.id == -1) {
          this._item = EmptyItem();
          this.characterService.ReloadInventory();
        }
      })
    }
  }

  OnCancelClick() {
    this.IsEditing = false;

    if(this._item.id == -1) {
      this.characterService.ReloadInventory();
    } else {
      this.itemForm.setValue(this._item);
    }
  }

  OnEditClick($event : Event) {
    $event.stopPropagation();
    this.IsEditing = true;
    this.IsOpened = true;
  }

  OnDeleteClick() {
    this.itemForm.disable();
    this.characterService.deleteItem(this._item.id)
      .subscribe(() => this.characterService.ReloadSkills());
  }

  OnAddToFavorite($event : Event) {
    $event.stopPropagation();
    this._item.favorite = !this._item.favorite;
    this.characterService.ChangeFavoriteSkill(this._item.id, this._item.favorite);
  }

  OnItemClick() {
    this.IsOpened = !this.IsOpened;
  }

  OnRollClick($event : Event) {
    $event.stopPropagation();
    if(this._item.formula)
    this.rolls.makeRoll(modes.normal, this._item.formula)
      .subscribe((val) => {
      if(val.result == -1) {
        this._snackBar.open("Ошибка", "Ок");
      } else {
        this._snackBar.open("Результат: " + val.result, "Ок");
      }
    });
  }

}
