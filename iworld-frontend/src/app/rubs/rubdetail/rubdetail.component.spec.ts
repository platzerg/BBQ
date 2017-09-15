import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RubdetailComponent } from './rubdetail.component';

describe('RubdetailComponent', () => {
  let component: RubdetailComponent;
  let fixture: ComponentFixture<RubdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RubdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RubdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
