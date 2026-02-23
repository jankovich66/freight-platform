import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLoad } from './create-load';

describe('CreateLoad', () => {
  let component: CreateLoad;
  let fixture: ComponentFixture<CreateLoad>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateLoad]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateLoad);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
