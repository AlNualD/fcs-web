import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Character } from '../services/models/character';
import {CharacterInfoProviderService} from "../services/character-info-provider.service";

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css'],
  providers: [CharacterInfoProviderService]

})
export class CharacterListComponent implements OnInit {

  characters: Character[] = [];

  @Input() curCharacter: Character | undefined;
  @Output() curCharacterChange = new EventEmitter<Character>();
  onCharacterChange(c : Character) {
    this.curCharacter = c;
    this.curCharacterChange.emit(c);
  }


  onCardClick(c: Character) {
    this.onCharacterChange(c);
  }

  constructor(private characterService : CharacterInfoProviderService) { }

  userId: number = 1;

  ngOnInit(): void {
    this.characterService.getCharactersList(1).subscribe((data:any) => this.characters=data);
    console.log(this.characters.length)
  }

}
