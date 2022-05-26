import { TestBed } from '@angular/core/testing';

import { CharacterCreateService } from './character-create.service';

describe('CharacterCreateService', () => {
  let service: CharacterCreateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharacterCreateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
