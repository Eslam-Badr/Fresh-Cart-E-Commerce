import { TestBed } from '@angular/core/testing';

import { MySwalMessageService } from './my-swal-message.service';

describe('MySwalMessageService', () => {
  let service: MySwalMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MySwalMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
