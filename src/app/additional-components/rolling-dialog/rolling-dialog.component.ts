import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {modes, RollingServiceService} from "../../services/rolling-service.service";

@Component({
  selector: 'app-rolling-dialog',
  templateUrl: './rolling-dialog.component.html',
  styleUrls: ['./rolling-dialog.component.css']
})
export class RollingDialogComponent implements OnInit {


  formula : FormControl = new FormControl(null, Validators.pattern("^[1-9]\\d*d[1-9]\\d*([+|-][1-9]\\d*)?"));
  formGroup = new FormGroup({
    "formula": this.formula
  });

  constructor(    public dialogRef: MatDialogRef<RollingDialogComponent>,
                  @Inject(MAT_DIALOG_DATA) public data: string,
                  private _snackBar: MatSnackBar,
                  private readonly rolls : RollingServiceService) { }

  ngOnInit(): void {
  }

  onButtonClick() {
    if(this.formula.valid) {
       this.rolls.makeRoll(modes.normal, this.formula.value)
         .subscribe(
           (val) => {
             if (val.result != -1) {
               this._snackBar.open("Результат броска " + val.result, "Ок");
             } else {
               this._snackBar.open("Ошибка", "Ок")
             }
           }
         )
    } else {
      this._snackBar.open("Ошибка", "Ок")
    }
  }
}
