import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialDepsModule } from '@incrudable/material-deps';

import { DatePreviewComponent } from './date-preview.component';

describe('DatePreviewComponent', () => {
  let component: DatePreviewComponent;
  let fixture: ComponentFixture<DatePreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, MaterialDepsModule, ReactiveFormsModule],
      declarations: [ DatePreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
