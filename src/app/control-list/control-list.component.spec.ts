import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlListComponent } from './control-list.component';

describe('ControlListComponent', () => {
  let component: ControlListComponent;
  let fixture: ComponentFixture<ControlListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
