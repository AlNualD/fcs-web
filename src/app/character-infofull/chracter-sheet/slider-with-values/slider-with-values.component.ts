import {ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MatSliderChange} from "@angular/material/slider";
import {CharacterService, HpBundle} from "../../../services/character.service";
import {Observable, Subject, takeUntil} from "rxjs";
import {Character} from "../../../services/models/character";

@Component({
  selector: 'app-slider-with-values',
  templateUrl: './slider-with-values.component.html',
  styleUrls: ['./slider-with-values.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderWithValuesComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject();

  hp$ : Observable<HpBundle>
  private character$ : Observable<Character | null>

  public hpMax : number = 0;
  public hpCur : number = 0;
  constructor(private readonly characterService : CharacterService) {
    this.hp$ = this.characterService.getHp();
    this.character$ = this.characterService.character
  }

  ngOnDestroy(): void {
        this.destroy$.next(null);
        this.destroy$.complete();
    }

  ngOnInit(): void {
    this.character$
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(
        (val) => {
          if(val) {
            this.hpMax = val.hp_max;
            this.hpCur = val.hp_cur;
          }
        }
      )
  }

  changeVal(event : MatSliderChange) {
    console.log(event.value);
    if(event.value) {
      this.characterService.setHp(
        {
          hpCur: event.value,
          hpMax: this.hpMax
        }
      )
    }
  }

}
