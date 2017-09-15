import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RublistComponent } from './rublist.component';

describe('RublistComponent', () => {
  let component: RublistComponent;
  let fixture: ComponentFixture<RublistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RublistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RublistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
