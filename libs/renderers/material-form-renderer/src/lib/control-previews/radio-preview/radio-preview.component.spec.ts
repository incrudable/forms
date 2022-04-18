import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialDepsModule } from '@incrudable/material-deps';

import { RadioPreviewComponent } from './radio-preview.component';

describe('RadioPreviewComponent', () => {
  let component: RadioPreviewComponent;
  let fixture: ComponentFixture<RadioPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, MaterialDepsModule, ReactiveFormsModule],

      declarations: [RadioPreviewComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
