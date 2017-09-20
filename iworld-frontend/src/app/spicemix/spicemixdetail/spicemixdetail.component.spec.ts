import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpicemixdetailComponent } from './spicemixdetail.component';

describe('SpicemixdetailComponent', () => {
  let component: SpicemixdetailComponent;
  let fixture: ComponentFixture<SpicemixdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpicemixdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpicemixdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
