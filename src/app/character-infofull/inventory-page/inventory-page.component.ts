import { Component, OnInit } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Item} from "../../services/models/item";
import {CharacterService} from "../../services/character.service";
import {Spell} from "../../services/models/spell";
import {Skill} from "../../services/models/skill";

@Component({
  selector: 'app-inventory-page',
  templateUrl: './inventory-page.component.html',
  styleUrls: ['./inventory-page.component.scss']
})
export class InventoryPageComponent implements OnInit {
  items$ : Subject<Item[]> = new Subject<Item[]>();
  money: number = 0;

  showFavorites : boolean = false;

  isEmpty : boolean = false;

  addItem : boolean = false;

  allItems: Item[] = [];
  curItems$ : Subject<Item> = new Subject<Item>();

  constructor(private readonly characterService : CharacterService) { }

  ngOnInit(): void {
    this.characterService.inventory$.subscribe(
      (val) => {
        this.isEmpty = false;

        if(val.length == 0) {
          this.isEmpty = true;
        }
        this.showFavorites = false;
        this.items$.next(val);
        this.allItems = val;
        this.addItem = false;
      });
  }

  OnItemClick(item : Item) {
    this.curItems$.next(item)
  }

  ShowFavorites() {
    this.showFavorites = !this.showFavorites;
    if(this.showFavorites) {
      this.items$.next(this.allItems.filter((item) => item.favorite));
    } else {
      this.items$.next(this.allItems);
    }
  }

  AddItem(){
    this.addItem = true;
  }

}
