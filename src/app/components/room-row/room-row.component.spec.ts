import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomRowComponent } from './room-row.component';

describe('RoomRowComponent', () => {
  let component: RoomRowComponent;
  let fixture: ComponentFixture<RoomRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
