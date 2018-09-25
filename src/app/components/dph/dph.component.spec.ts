import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DphComponent } from './dph.component';

describe('DphComponent', () => {
  let component: DphComponent;
  let fixture: ComponentFixture<DphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
