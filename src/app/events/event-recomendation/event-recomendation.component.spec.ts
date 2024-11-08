import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventRecomendationComponent } from './event-recomendation.component';

describe('EventRecomendationComponent', () => {
  let component: EventRecomendationComponent;
  let fixture: ComponentFixture<EventRecomendationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventRecomendationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventRecomendationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
