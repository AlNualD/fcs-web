import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-create-character',
  templateUrl: './create-character.component.html',
  styleUrls: ['./create-character.component.css']
})
export class CreateCharacterComponent implements OnInit {

  cid : number | null
  template : string = "Custom";
  templates : string[] = [
    "Custom",
    "DnD"
  ];

  constructor(private readonly activateRoute : ActivatedRoute) {
    this.template = activateRoute.snapshot.params['template'];
    this.cid = activateRoute.snapshot.params['cid'] ? +activateRoute.snapshot.params['cid'] : null;
    console.log("cid " + this.cid);
  }

  ngOnInit(): void {
  }

}
