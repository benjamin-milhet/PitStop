import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationTableComponent } from './reservation-table.component';

describe('ReservationTableComponent', () => {
  let component: ReservationTableComponent;
  let fixture: ComponentFixture<ReservationTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservationTableComponent]
    });
    fixture = TestBed.createComponent(ReservationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
