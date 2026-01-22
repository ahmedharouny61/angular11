import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomerComponent } from './welcomer.component';

describe('WelcomerComponent', () => {
  let component: WelcomerComponent;
  let fixture: ComponentFixture<WelcomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WelcomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
