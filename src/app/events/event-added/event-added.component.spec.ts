import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventAddedComponent } from './event-added.component';

describe('EventAddedComponent', () => {
  let component: EventAddedComponent;
  let fixture: ComponentFixture<EventAddedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventAddedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventAddedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
