import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlDetailsComponent } from './control-details.component';

describe('ControlDetailsComponent', () => {
  let component: ControlDetailsComponent;
  let fixture: ComponentFixture<ControlDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
