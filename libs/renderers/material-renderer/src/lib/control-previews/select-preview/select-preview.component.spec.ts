import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPreviewComponent } from './select-preview.component';

describe('SelectPreviewComponent', () => {
  let component: SelectPreviewComponent;
  let fixture: ComponentFixture<SelectPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelectPreviewComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
