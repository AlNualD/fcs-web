import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterListCardComponent } from './character-list-card.component';

describe('CharacterListCardComponent', () => {
  let component: CharacterListCardComponent;
  let fixture: ComponentFixture<CharacterListCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacterListCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
