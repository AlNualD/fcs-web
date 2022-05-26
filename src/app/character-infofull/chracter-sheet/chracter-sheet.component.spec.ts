import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChracterSheetComponent } from './chracter-sheet.component';

describe('ChracterSheetComponent', () => {
  let component: ChracterSheetComponent;
  let fixture: ComponentFixture<ChracterSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChracterSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChracterSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
