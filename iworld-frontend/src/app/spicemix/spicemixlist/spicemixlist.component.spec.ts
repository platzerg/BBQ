import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpicemixlistComponent } from './spicemixlist.component';

describe('SpicemixlistComponent', () => {
  let component: SpicemixlistComponent;
  let fixture: ComponentFixture<SpicemixlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpicemixlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpicemixlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
