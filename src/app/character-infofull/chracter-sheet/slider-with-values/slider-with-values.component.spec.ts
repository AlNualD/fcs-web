import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderWithValuesComponent } from './slider-with-values.component';

describe('SliderWithValuesComponent', () => {
  let component: SliderWithValuesComponent;
  let fixture: ComponentFixture<SliderWithValuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SliderWithValuesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderWithValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
