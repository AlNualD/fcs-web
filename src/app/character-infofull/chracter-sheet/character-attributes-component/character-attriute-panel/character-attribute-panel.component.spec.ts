import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterAttributePanelComponent } from './character-attribute-panel.component';

describe('CharacterAttriutePanelComponent', () => {
  let component: CharacterAttributePanelComponent;
  let fixture: ComponentFixture<CharacterAttributePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacterAttributePanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterAttributePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
