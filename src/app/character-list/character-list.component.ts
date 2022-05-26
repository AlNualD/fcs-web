import {Component, OnDestroy, OnInit} from '@angular/core';
import {Character} from '../services/models/character';
import {CharacterInfoProviderService} from "../services/character-info-provider.service";
import {CharacterService} from "../services/character.service";
import {MatDialog} from "@angular/material/dialog";
import {ChooseDialogComponent} from "../create-character/choose.dialog/choose-dialog.component";
import {Router} from "@angular/router";
import {AsyncSubject, takeUntil} from "rxjs";

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss'],
  providers: [CharacterInfoProviderService]

})
export class CharacterListComponent implements OnInit, OnDestroy {

  private destroy$ : AsyncSubject<any> = new AsyncSubject<any>();

  curId: number = -1;
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
    this.curCharacterService
      .character
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(
      (character) =>{
        if(character) {
          this.curId = character.id;
        }
      }
    );

    this.curCharacterService
      .InfoUpdates$
      .subscribe(
        (val) => {
          this.characters.map((character) => {
            if(character.id == val.id) {
              character.description = val.description;
            }
          })
        }
      )
    console.log(this.characters.length)
  }

  onAddCharacterButtonClick() {
    const dialogRef = this.dialog.open(ChooseDialogComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' + result);
      this.router.navigate(['create',result]);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete()
  }
}
