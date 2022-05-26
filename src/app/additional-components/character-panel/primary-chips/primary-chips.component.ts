import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-primary-chips',
  templateUrl: './primary-chips.component.html',
  styleUrls: ['./primary-chips.component.scss']
})
export class PrimaryChipsComponent implements OnInit {

  @Input()
  value!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
