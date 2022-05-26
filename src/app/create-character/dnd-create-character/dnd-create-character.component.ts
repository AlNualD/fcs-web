import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CharacterCreateService} from "../../services/character-create.service";
import {Observable} from "rxjs";
import {CharacterUpdate} from "../../services/models/character";

@Component({
  selector: 'app-dnd-create-character',
  templateUrl: './dnd-create-character.component.html',
  styleUrls: ['./dnd-create-character.component.css']
})
export class DndCreateCharacterComponent implements OnInit {

  character : CharacterUpdate | null = null;

  customForm : FormGroup = new FormGroup({
    "name" : new FormControl(null,Validators.required),
    "classC" : new FormControl(null, Validators.required),
    "race" : new FormControl(null, Validators.required),
    "hp_max" : new FormControl(1),
    "money" : new FormControl(null, [Validators.required, Validators.min(0)]),
    "alignment" : new FormControl(null),
    "lvl" : new FormControl(1),
    "healthDice" : new FormControl(1),

  });

  races$ : Observable<string[]> = new Observable<string[]>();
  classes$ : Observable<string[]> = new Observable<string[]>();

  constructor(private readonly router : Router,
              private readonly createCharacterService : CharacterCreateService) { }

  ngOnInit(): void {
    this.races$ = this.createCharacterService.getRaces();
    this.classes$ = this.createCharacterService.getClasses();
  }

  OnBackButtonClick() {
    this.router.navigate(['/main']);
  }

  OnSaveButtonClick() {
    if(this.customForm.valid) {
      this.character = this.customForm.value;
      if(this.character) {
        this.character.url="";
        this.character.profBonus=0;
        this.character.hp_cur=0;
        this.character.description="";
        this.character.spells_total=0;
        this.createCharacterService
          .createDndCharacter(this.character)
          .subscribe(() => {
            this.router.navigate(['/main']);
          })
      }
    }
  }
}
