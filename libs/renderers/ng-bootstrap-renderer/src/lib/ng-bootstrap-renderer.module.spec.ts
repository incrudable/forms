import { async, TestBed } from '@angular/core/testing';

import { NgBootstrapRendererModule } from './ng-bootstrap-renderer.module';

describe('RenderersNgBootstrapRendererModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgBootstrapRendererModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(NgBootstrapRendererModule).toBeDefined();
  });
});
