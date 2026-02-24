import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyLoads } from './my-loads';

describe('MyLoads', () => {
  let component: MyLoads;
  let fixture: ComponentFixture<MyLoads>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyLoads]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyLoads);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
