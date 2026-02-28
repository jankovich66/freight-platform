import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadCard } from './load-card';

describe('LoadCard', () => {
  let component: LoadCard;
  let fixture: ComponentFixture<LoadCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
