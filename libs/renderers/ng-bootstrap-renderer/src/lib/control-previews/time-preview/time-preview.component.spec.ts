import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimePreviewComponent } from './time-preview.component';

describe('TimePreviewComponent', () => {
  let component: TimePreviewComponent;
  let fixture: ComponentFixture<TimePreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimePreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
