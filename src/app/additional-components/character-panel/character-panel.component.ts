import {Component, Input, OnInit} from '@angular/core';
import {Character} from "../../services/models/character";

@Component({
  selector: 'app-character-panel',
  templateUrl: './character-panel.component.html',
  styleUrls: ['./character-panel.component.scss']
})
export class CharacterPanelComponent implements OnInit {

  @Input()
  character!: Character;

  @Input()
  isActive!: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
