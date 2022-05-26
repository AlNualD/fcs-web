import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Character} from "../../services/models/character";
import {CharacterService} from "../../services/character.service";
import {Attribute} from "../../services/models/attribute";
import {debounceTime, Observable, Subject} from "rxjs";
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {ChooseDialogComponent} from "../../create-character/choose.dialog/choose-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {RollingDialogComponent} from "../../additional-components/rolling-dialog/rolling-dialog.component";

@Component({
  selector: 'app-chracter-sheet',
  templateUrl: './chracter-sheet.component.html',
  styleUrls: ['./chracter-sheet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChracterSheetComponent implements OnInit {

  @Input()
  set character(character : Character) {
    this._character = character;
    this.notes.setValue(character.description);
  }
  public _character! : Character;

  public attributes$! : Observable<Attribute[]>;
  public hpCur: number = 0; //$ : Subject<number> = new Subject<number>();

  notes : FormControl = new FormControl();


  notesGroup : FormGroup = new FormGroup({
    "notes" : this.notes
  });


  constructor(
    readonly characterService : CharacterService,
    private readonly navigation : Router,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
     //$.next(this.character.hp_cur);
    this.attributes$ = this.characterService.getAttributes();

    this.notesGroup
      .valueChanges
      .pipe(debounceTime(1000))
      .subscribe((val) => {
        this.characterService.UpdateCharacterDescription(val.notes);
      })
  }

  changeSlider(value : number | null) {
    if(value) {
      this._character.hp_cur = value;
      this.hpCur = value;//$.next(value);
    }
  }

  OnPictureClick() {

  }

  OnEditClick() {
    this.navigation.navigate(['update','Custom',this._character.id]);
  }

  OnCustomRoll() {
    const dialogRef = this.dialog.open(RollingDialogComponent, {
    });
  }
}
