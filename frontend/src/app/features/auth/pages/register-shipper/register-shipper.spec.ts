import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterShipper } from './register-shipper';

describe('RegisterShipper', () => {
  let component: RegisterShipper;
  let fixture: ComponentFixture<RegisterShipper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterShipper]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterShipper);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
