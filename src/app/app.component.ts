import { Component } from '@angular/core';
import {Character} from "./services/models/character";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fcs-web';

  curCharacter: Character | undefined;


}
