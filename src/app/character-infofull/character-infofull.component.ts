import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Character} from "../services/models/character";
import {CharacterService} from "../services/character.service";

@Component({
  selector: 'app-character-infofull',
  templateUrl: './character-infofull.component.html',
  styleUrls: ['./character-infofull.component.css']
})
export class CharacterInfofullComponent implements OnInit {

  curCharacter : Character | undefined;

  onCharacterChange(c: Character) {
    this.curCharacter = c;
  }

  constructor(private characterService : CharacterService) { }

  ngOnInit(): void {
    this.characterService.character.subscribe(
      (c) => {
        if(c != null) {
          this.curCharacter = c;
        }
      }
    )
  }

}
