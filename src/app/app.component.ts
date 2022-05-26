import { Component } from '@angular/core';
import {Character} from "./services/models/character";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fcs-web';

  constructor(iconRegistry : MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('delete', sanitizer.bypassSecurityTrustResourceUrl("../icons/delete.svg"));
    iconRegistry.addSvgIcon('heart', sanitizer.bypassSecurityTrustResourceUrl("../icons/cards-heart.svg"));
    iconRegistry.addSvgIcon('bag',sanitizer.bypassSecurityTrustResourceUrl("../icons/bag.svg"));
    iconRegistry.addSvgIcon('edit',sanitizer.bypassSecurityTrustResourceUrl("../icons/border-color.svg"));
    iconRegistry.addSvgIcon('star-outline',sanitizer.bypassSecurityTrustResourceUrl("../icons/star-outline.svg"))
    iconRegistry.addSvgIcon('star',sanitizer.bypassSecurityTrustResourceUrl("../icons/star.svg"));
    iconRegistry.addSvgIcon('piggy',sanitizer.bypassSecurityTrustResourceUrl("../icons/piggy-bank.svg"));
    iconRegistry.addSvgIcon('close',sanitizer.bypassSecurityTrustResourceUrl("../icons/close.svg"));
    iconRegistry.addSvgIcon('accept',sanitizer.bypassSecurityTrustResourceUrl("../icons/check.svg"));
    iconRegistry.addSvgIcon('dice',sanitizer.bypassSecurityTrustResourceUrl("../icons/logo.svg"));
  }

}
