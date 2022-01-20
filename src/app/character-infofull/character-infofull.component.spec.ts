import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterInfofullComponent } from './character-infofull.component';

describe('CharacterInfofullComponent', () => {
  let component: CharacterInfofullComponent;
  let fixture: ComponentFixture<CharacterInfofullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacterInfofullComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterInfofullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
