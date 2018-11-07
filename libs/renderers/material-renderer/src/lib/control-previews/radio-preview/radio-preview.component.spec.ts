import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioPreviewComponent } from './radio-preview.component';

describe('RadioPreviewComponent', () => {
  let component: RadioPreviewComponent;
  let fixture: ComponentFixture<RadioPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadioPreviewComponent ]
    })
    .compileComponents();
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
