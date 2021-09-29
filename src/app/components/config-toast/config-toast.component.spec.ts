import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigToastComponent } from './config-toast.component';

describe('ConfigToastComponent', () => {
  let component: ConfigToastComponent;
  let fixture: ComponentFixture<ConfigToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigToastComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
