import { async, TestBed } from '@angular/core/testing';

import { MaterialDepsModule } from './material-deps.module';

describe('MaterialDepsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialDepsModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(MaterialDepsModule).toBeDefined();
  });
});
