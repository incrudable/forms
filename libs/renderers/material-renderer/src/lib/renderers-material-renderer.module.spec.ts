import { async, TestBed } from '@angular/core/testing';

import { RenderersMaterialRendererModule } from './renderers-material-renderer.module';

describe('RenderersMaterialRendererModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RenderersMaterialRendererModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(RenderersMaterialRendererModule).toBeDefined();
  });
});
