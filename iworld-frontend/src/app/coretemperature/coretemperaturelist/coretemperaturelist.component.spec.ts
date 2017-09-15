import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoretemperaturelistComponent } from './coretemperaturelist.component';

describe('CoretemperaturelistComponent', () => {
  let component: CoretemperaturelistComponent;
  let fixture: ComponentFixture<CoretemperaturelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoretemperaturelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoretemperaturelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
