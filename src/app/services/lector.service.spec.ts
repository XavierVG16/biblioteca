import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

import { LectorService } from './lector.service';

describe('LectorService', () => {
  let service: LectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]

    });
    service = TestBed.inject(LectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
