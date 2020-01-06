import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialDepsModule } from '@incrudable/material-deps';

import { CheckboxPreviewComponent } from './checkbox-preview.component';

describe('CheckboxPreviewComponent', () => {
  let component: CheckboxPreviewComponent;
  let fixture: ComponentFixture<CheckboxPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, MaterialDepsModule, ReactiveFormsModule],
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
