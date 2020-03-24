import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatePreviewComponent } from './date-preview.component';

describe('DatePreviewComponent', () => {
  let component: DatePreviewComponent;
  let fixture: ComponentFixture<DatePreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
