import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCarrierCard } from './admin-carrier-card';

describe('AdminCarrierCard', () => {
  let component: AdminCarrierCard;
  let fixture: ComponentFixture<AdminCarrierCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCarrierCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCarrierCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
