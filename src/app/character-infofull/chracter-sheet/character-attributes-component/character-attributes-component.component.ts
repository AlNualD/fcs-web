import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {Attribute} from "../../../services/models/attribute";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-character-attributes-component',
  templateUrl: './character-attributes-component.component.html',
  styleUrls: ['./character-attributes-component.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharacterAttributesComponentComponent implements OnInit {

  IsEditing : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  IsAdding : boolean = false;
  Adding : Subject<null> = new Subject<any>();
  @Input()
  attributes$! : Observable<Attribute[]>;


  constructor() { }

  ngOnInit(): void {

  }

  OnEditClick($event : Event) {
    $event.stopPropagation();

    this.IsEditing.next(!this.IsEditing.getValue());
    this.IsAdding=false;
  }

  OnAddAttributeClick() {
      this.IsAdding = true;
      this.Adding.next(null);
  }
}
