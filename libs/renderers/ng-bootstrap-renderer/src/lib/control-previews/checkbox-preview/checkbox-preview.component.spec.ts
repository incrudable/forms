import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxPreviewComponent } from './checkbox-preview.component';

describe('CheckboxPreviewComponent', () => {
  let component: CheckboxPreviewComponent;
  let fixture: ComponentFixture<CheckboxPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckboxPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
