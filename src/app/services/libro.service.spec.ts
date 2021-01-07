import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { LibroService } from './libro.service';

describe('LibroService', () => {
  let service: LibroService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(LibroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
