import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCarrier } from './register-carrier';

describe('RegisterCarrier', () => {
  let component: RegisterCarrier;
  let fixture: ComponentFixture<RegisterCarrier>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterCarrier]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterCarrier);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
