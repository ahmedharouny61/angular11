import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageRadioDemoComponent } from './image-radio-demo.component';

describe('ImageRadioDemoComponent', () => {
  let component: ImageRadioDemoComponent;
  let fixture: ComponentFixture<ImageRadioDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageRadioDemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageRadioDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
