import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventRaterComponent } from './event-rater.component';

describe('EventRaterComponent', () => {
  let component: EventRaterComponent;
  let fixture: ComponentFixture<EventRaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventRaterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventRaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
