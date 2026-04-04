import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminApplicationsDetails } from './admin-applications-details';

describe('AdminApplicationsDetails', () => {
  let component: AdminApplicationsDetails;
  let fixture: ComponentFixture<AdminApplicationsDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminApplicationsDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminApplicationsDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
