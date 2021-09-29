import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigToastZoneComponent } from './config-toast-zone.component';

describe('ConfigToastZoneComponent', () => {
  let component: ConfigToastZoneComponent;
  let fixture: ComponentFixture<ConfigToastZoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigToastZoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigToastZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
