import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsRoomComponent } from './details-room.component';

describe('HistoryItemComponent', () => {
  let component: DetailsRoomComponent;
  let fixture: ComponentFixture<DetailsRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
