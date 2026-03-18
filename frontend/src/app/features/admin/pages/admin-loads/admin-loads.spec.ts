import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLoads } from './admin-loads';

describe('AdminLoads', () => {
  let component: AdminLoads;
  let fixture: ComponentFixture<AdminLoads>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminLoads]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminLoads);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
