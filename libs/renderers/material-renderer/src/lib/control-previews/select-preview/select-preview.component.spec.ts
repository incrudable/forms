import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialDepsModule } from '@incrudable/material-deps';

import { SelectPreviewComponent } from './select-preview.component';

describe('SelectPreviewComponent', () => {
  let component: SelectPreviewComponent;
  let fixture: ComponentFixture<SelectPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, MaterialDepsModule, ReactiveFormsModule],
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
