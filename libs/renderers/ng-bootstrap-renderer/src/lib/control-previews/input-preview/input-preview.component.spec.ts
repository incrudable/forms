import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputPreviewComponent } from './input-preview.component';

describe('InputPreviewComponent', () => {
  let component: InputPreviewComponent;
  let fixture: ComponentFixture<InputPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
