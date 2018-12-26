import { TestBed } from '@angular/core/testing';

import { GetInfoOfAppService } from './get-info-of-app.service';

describe('GetInfoOfAppService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetInfoOfAppService = TestBed.get(GetInfoOfAppService);
    expect(service).toBeTruthy();
  });
});
