import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigTimeoutComponent } from './config-timeout.component';

describe('ConfigTimeoutComponent', () => {
  let component: ConfigTimeoutComponent;
  let fixture: ComponentFixture<ConfigTimeoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigTimeoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigTimeoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
