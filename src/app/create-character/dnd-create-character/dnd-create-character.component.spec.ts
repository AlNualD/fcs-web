import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DndCreateCharacterComponent } from './dnd-create-character.component';

describe('DndCreateCharacterComponent', () => {
  let component: DndCreateCharacterComponent;
  let fixture: ComponentFixture<DndCreateCharacterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DndCreateCharacterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DndCreateCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
