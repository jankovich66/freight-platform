import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenLoads } from './open-loads';

describe('OpenLoads', () => {
  let component: OpenLoads;
  let fixture: ComponentFixture<OpenLoads>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpenLoads]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenLoads);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
