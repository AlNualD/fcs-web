import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {CharacterInfoProviderService} from "../../services/character-info-provider.service";
import {Character, CharacterUpdate} from "../../services/models/character";
import {DropboxApiService, ImageSnippet} from "../../services/dropbox-api.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-custom-create-character',
  templateUrl: './custom-create-character.component.html',
  styleUrls: ['./custom-create-character.component.scss']
})
export class CustomCreateCharacterComponent implements OnInit {

  @Input()
  cid : number | null = null;

  ch? : CharacterUpdate;
  picture : string = "";

  name : FormControl = new FormControl(null, Validators.required);
  classC : FormControl = new FormControl(null, Validators.required);
  race : FormControl = new FormControl(null, Validators.required);
  hp_max : FormControl = new FormControl(null, Validators.pattern("^[1-9]{1}[0-9]*"));
  money: FormControl = new FormControl(null, Validators.min(0));
  alignment : FormControl = new FormControl(null);
  lvl : FormControl = new FormControl(null, [Validators.required, Validators.min(0)]);

  customForm : FormGroup = new FormGroup({
    "name": this.name,
    "classC" : this.classC,
    "race" : this.race,
    "hp_max" : this.hp_max,
    "money" : this.money,
    "alignment" : this.alignment,
    "lvl": this.lvl,
    "id": new FormControl(null),
    "healthDice" : new FormControl(1),
    "hp_cur" : new FormControl(1),
    "spells_total" : new FormControl(0),
    "description" : new FormControl(""),
    "url" : new FormControl(null),
    "profBonus": new FormControl(1)
  });

  constructor(private readonly router : Router,
              private readonly characterService : CharacterInfoProviderService,
              private imageService: DropboxApiService) {
    this.url$ = imageService.sharedLink$.asObservable();

  }

  ngOnInit(): void {
    if(this.cid) {
      this.characterService.getCharacterInfo(this.cid)
        .subscribe(
          value => {
            this.customForm.setValue(value);
          }
        )
    }
    this.url$.subscribe(
      (url) => this.picture=url
    )
  }

  OnBackButtonClick() {
    this.router.navigate(['/main']);
  }

  OnSaveButtonClick() {
    console.log("here " + this.name.value);
    console.log(this.customForm);
    if(this.customForm.valid) {
      this.ch = this.customForm.value;
      console.log("ch " + this.ch?.name);
      if(this.ch) {
        if(this.picture != ""){
        this.ch.url = this.picture;
        }

        this.characterService
          .UpdateCharacter(this.cid,this.ch)
          .subscribe(
            (val) => {
              console.log("saved!");
              this.router.navigate(['/main']);
            });
      }
    }
  }

  url$ : Observable<string>;
  image :string = "";

  selectedFile?: ImageSnippet;



  OnLoadPicture(imageInput: any) {
    //this.imageService.uploadImg3(imageInput);
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);

      this.imageService.uploadImage(this.selectedFile.file);
    });

    reader.readAsDataURL(file);
  }

}
