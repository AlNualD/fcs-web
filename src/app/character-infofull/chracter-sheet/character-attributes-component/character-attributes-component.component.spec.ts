import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterAttributesComponentComponent } from './character-attributes-component.component';

describe('CharacterAttributesComponentComponent', () => {
  let component: CharacterAttributesComponentComponent;
  let fixture: ComponentFixture<CharacterAttributesComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacterAttributesComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterAttributesComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
