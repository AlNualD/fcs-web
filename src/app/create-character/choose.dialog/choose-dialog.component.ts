import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-choose.dialog',
  templateUrl: './choose-dialog.component.html',
  styleUrls: ['./choose-dialog.component.css']
})
export class ChooseDialogComponent implements OnInit {

  public templates: string[] = ["DnD", "Custom"]
  constructor() { }

  ngOnInit(): void {
  }

}
