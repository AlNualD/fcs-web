import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RollingDialogComponent } from './rolling-dialog.component';

describe('RollingDialogComponent', () => {
  let component: RollingDialogComponent;
  let fixture: ComponentFixture<RollingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RollingDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RollingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
