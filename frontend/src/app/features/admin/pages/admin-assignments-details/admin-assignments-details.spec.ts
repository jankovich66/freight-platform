import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAssignmentsDetails } from './admin-assignments-details';

describe('AdminAssignmentsDetails', () => {
  let component: AdminAssignmentsDetails;
  let fixture: ComponentFixture<AdminAssignmentsDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAssignmentsDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAssignmentsDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
