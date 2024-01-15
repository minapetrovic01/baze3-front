import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroundCanvasComponent } from './background-canvas.component';

describe('BackgroundCanvasComponent', () => {
  let component: BackgroundCanvasComponent;
  let fixture: ComponentFixture<BackgroundCanvasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BackgroundCanvasComponent]
    });
    fixture = TestBed.createComponent(BackgroundCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
