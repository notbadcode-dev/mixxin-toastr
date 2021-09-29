import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigProgressbarComponent } from './config-progressbar.component';

describe('ConfigProgressbarComponent', () => {
  let component: ConfigProgressbarComponent;
  let fixture: ComponentFixture<ConfigProgressbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigProgressbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigProgressbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
