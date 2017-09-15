import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpicelistComponent } from './spicelist.component';

describe('SpicelistComponent', () => {
  let component: SpicelistComponent;
  let fixture: ComponentFixture<SpicelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpicelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpicelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
