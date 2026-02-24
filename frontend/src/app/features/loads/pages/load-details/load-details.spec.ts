import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadDetails } from './load-details';

describe('LoadDetails', () => {
  let component: LoadDetails;
  let fixture: ComponentFixture<LoadDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
