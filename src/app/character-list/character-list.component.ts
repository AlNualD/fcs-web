import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Character } from '../services/models/character';
import {CharacterInfoProviderService} from "../services/character-info-provider.service";
import {CharacterService} from "../services/character.service";
import {MatDialog} from "@angular/material/dialog";
import {ChooseDialogComponent} from "../create-character/choose.dialog/choose-dialog.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css'],
  providers: [CharacterInfoProviderService]

})
export class CharacterListComponent implements OnInit {

  characters: Character[] = [];

  //@Input() curCharacter: Character | undefined;
 // @Output() curCharacterChange = new EventEmitter<Character>();
  onCharacterChange(c : Character) {
    this.curCharacterService.nextCharacter(c)
    // this.curCharacter = c;
    // this.curCharacterChange.emit(c);
  }


  onCardClick(c: Character) {
    this.onCharacterChange(c);
  }

  constructor(private characterService : CharacterInfoProviderService,
              private curCharacterService : CharacterService,
              public dialog: MatDialog,
              private router: Router) { }

  userId: number = 1;

  ngOnInit(): void {
    this.characterService.getCharactersList(1).subscribe((data:any) => this.characters=data);
    console.log(this.characters.length)
  }

  onAddCharacterButtonClick() {
    const dialogRef = this.dialog.open(ChooseDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      const template = result;
      this.router.navigate(['create',template])
    });
  }
}
