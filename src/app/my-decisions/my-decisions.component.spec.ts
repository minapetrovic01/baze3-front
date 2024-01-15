import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDecisionsComponent } from './my-decisions.component';

describe('MyDecisionsComponent', () => {
  let component: MyDecisionsComponent;
  let fixture: ComponentFixture<MyDecisionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyDecisionsComponent]
    });
    fixture = TestBed.createComponent(MyDecisionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
