import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCreateCharacterComponent } from './custom-create-character.component';

describe('CustomCreateCharacterComponent', () => {
  let component: CustomCreateCharacterComponent;
  let fixture: ComponentFixture<CustomCreateCharacterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomCreateCharacterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomCreateCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
