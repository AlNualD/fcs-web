import {Component, Inject, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-choose.dialog',
  templateUrl: './choose-dialog.component.html',
  styleUrls: ['./choose-dialog.component.css']
})
export class ChooseDialogComponent implements OnInit {

  public templates: string[] = ["DnD", "Custom"]
  public curTemplate = "DnD";

  constructor(    public dialogRef: MatDialogRef<ChooseDialogComponent>,
                  @Inject(MAT_DIALOG_DATA) public data: string,) { }

  ngOnInit(

  ): void {
  }

  onButtonClick() {
      this.dialogRef.close();
  }
}
