import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricalGamesComponent } from './historical-games.component';

describe('HistoricalGamesComponent', () => {
  let component: HistoricalGamesComponent;
  let fixture: ComponentFixture<HistoricalGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricalGamesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricalGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
