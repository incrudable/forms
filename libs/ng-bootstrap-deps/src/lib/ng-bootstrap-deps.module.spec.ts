import { async, TestBed } from '@angular/core/testing';
import { NgBootstrapDepsModule } from './ng-bootstrap-deps.module';

describe('NgBootstrapDepsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgBootstrapDepsModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(NgBootstrapDepsModule).toBeDefined();
  });
});
