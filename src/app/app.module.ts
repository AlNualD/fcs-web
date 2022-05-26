import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CharacterListComponent } from './character-list/character-list.component';
import { CharacterInfofullComponent } from './character-infofull/character-infofull.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MatCardModule} from "@angular/material/card";
import {MatTabsModule} from "@angular/material/tabs";
import { AuthPageComponent } from './components/auth-page/auth-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import {AppRoutingModule} from "./app-routing/app-routing.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TokenInterceptor} from "./services/token.interceptor";
import { CreateCharacterComponent } from './create-character/create-character.component';
import { ChooseDialogComponent } from './create-character/choose.dialog/choose-dialog.component';
import {MatSelectModule} from "@angular/material/select";
import {MatDialogModule} from "@angular/material/dialog";
import { MatChipsModule} from "@angular/material/chips";
import { ChracterSheetComponent } from './character-infofull/chracter-sheet/chracter-sheet.component';
import {MatSliderModule} from "@angular/material/slider";
import { CharacterPanelComponent } from './additional-components/character-panel/character-panel.component';
import { SkillPanelComponent } from './additional-components/skill-panel/skill-panel.component';
import { CharacterAttributesComponentComponent } from './character-infofull/chracter-sheet/character-attributes-component/character-attributes-component.component';
import {MatExpansionModule} from "@angular/material/expansion";
import { CharacterAttributePanelComponent } from './character-infofull/chracter-sheet/character-attributes-component/character-attriute-panel/character-attribute-panel.component';
import { SliderWithValuesComponent } from './character-infofull/chracter-sheet/slider-with-values/slider-with-values.component';
import { CustomCreateCharacterComponent } from './create-character/custom-create-character/custom-create-character.component';
import { DndCreateCharacterComponent } from './create-character/dnd-create-character/dnd-create-character.component';
import { CharacterListCardComponent } from './character-list/character-list-card/character-list-card.component';
import { SkillsPageComponent } from './character-infofull/skills-page/skills-page.component';
import { PrimaryChipsComponent } from './additional-components/character-panel/primary-chips/primary-chips.component';
import { SpellPanelComponent } from './additional-components/spell-panel/spell-panel.component';
import { SpellsPageComponent } from './character-infofull/spells-page/spells-page.component';
import { InventoryPageComponent } from './character-infofull/inventory-page/inventory-page.component';
import { ItemPanelComponent } from './additional-components/item-panel/item-panel.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import { RollingDialogComponent } from './additional-components/rolling-dialog/rolling-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    CharacterListComponent,
    CharacterInfofullComponent,
    AuthPageComponent,
    MainPageComponent,
    CreateCharacterComponent,
    ChooseDialogComponent,
    ChracterSheetComponent,
    CharacterPanelComponent,
    SkillPanelComponent,
    CharacterAttributesComponentComponent,
    CharacterAttributePanelComponent,
    SliderWithValuesComponent,
    CustomCreateCharacterComponent,
    DndCreateCharacterComponent,
    CharacterListCardComponent,
    SkillsPageComponent,
    PrimaryChipsComponent,
    SpellPanelComponent,
    SpellsPageComponent,
    InventoryPageComponent,
    ItemPanelComponent,
    RollingDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTabsModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatDialogModule,
    MatChipsModule,
    MatSliderModule,
    MatExpansionModule,
    FormsModule,
    MatCheckboxModule,
    MatSnackBarModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    MatSnackBarModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
