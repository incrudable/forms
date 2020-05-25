import { TestBed } from '@angular/core/testing';

import { FormRendererService } from './form-renderer.service';

describe('FormRendererService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormRendererService = TestBed.inject(FormRendererService);
    expect(service).toBeTruthy();
  });
});
