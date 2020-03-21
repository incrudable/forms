import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgBootstrapDemoComponent } from './ng-bootstrap-demo.component';

describe('NgBootstrapDemoComponent', () => {
  let component: NgBootstrapDemoComponent;
  let fixture: ComponentFixture<NgBootstrapDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgBootstrapDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgBootstrapDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
