import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Character} from "../services/models/character";

@Component({
  selector: 'app-character-infofull',
  templateUrl: './character-infofull.component.html',
  styleUrls: ['./character-infofull.component.css']
})
export class CharacterInfofullComponent implements OnInit {

  @Input() curCharacter : Character | undefined;
  @Output() curCharacterChanged = new EventEmitter<Character>();

  onCharacterChange(c: Character) {
    this.curCharacter = c;
    this.curCharacterChanged.emit(c);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
