import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicHtmlHostComponent } from './dynamic-html-host.component';

describe('DynamicHtmlHostComponent', () => {
  let component: DynamicHtmlHostComponent;
  let fixture: ComponentFixture<DynamicHtmlHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicHtmlHostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicHtmlHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
