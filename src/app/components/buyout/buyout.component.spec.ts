import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyoutComponent } from './buyout.component';

describe('BuyoutComponent', () => {
  let component: BuyoutComponent;
  let fixture: ComponentFixture<BuyoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
