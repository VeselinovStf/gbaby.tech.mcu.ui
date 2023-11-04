import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterTankComponent } from './water-tank.component';

describe('WaterTankComponent', () => {
  let component: WaterTankComponent;
  let fixture: ComponentFixture<WaterTankComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WaterTankComponent]
    });
    fixture = TestBed.createComponent(WaterTankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
