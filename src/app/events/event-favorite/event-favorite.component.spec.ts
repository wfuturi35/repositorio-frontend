import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventFavoriteComponent } from './event-favorite.component';

describe('EventFavoriteComponent', () => {
  let component: EventFavoriteComponent;
  let fixture: ComponentFixture<EventFavoriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventFavoriteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventFavoriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
