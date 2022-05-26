import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryChipsComponent } from './primary-chips.component';

describe('PrimaryChipsComponent', () => {
  let component: PrimaryChipsComponent;
  let fixture: ComponentFixture<PrimaryChipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrimaryChipsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimaryChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
