import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigMainComponent } from './config-main.component';

describe('ConfigMainComponent', () => {
  let component: ConfigMainComponent;
  let fixture: ComponentFixture<ConfigMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
