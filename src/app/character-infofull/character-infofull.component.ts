import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Character} from "../services/models/character";
import {CharacterService} from "../services/character.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-character-infofull',
  templateUrl: './character-infofull.component.html',
  styleUrls: ['./character-infofull.component.css']
})
export class CharacterInfofullComponent implements OnInit {

  //curCharacter : Character | undefined;

  character$ : Observable<Character | null>;

  // onCharacterChange(c: Character) {
  //   this.curCharacter = c;
  // }

  constructor(private characterService : CharacterService) {
    this.character$ = characterService.character;
  }

  ngOnInit(): void { }

}
