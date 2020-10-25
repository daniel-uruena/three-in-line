import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IGame } from '../../models/Game';
import { Subscription } from 'rxjs';
import { selectHistoricalGamesState } from '../../store/Game/game.selectors';
import * as gameActions from '../../store/Game/game.actions';

@Component({
  selector: 'app-historical-games',
  templateUrl: './historical-games.component.html',
  styleUrls: ['./historical-games.component.scss']
})
export class HistoricalGamesComponent implements OnInit, OnDestroy {

  games: IGame[] = [];
  subscriptions: Subscription;

  constructor(private store: Store<{}>) {
    this.subscriptions = new Subscription();
  }

  ngOnInit(): void {
    this.store.dispatch(gameActions.getHistoricalGamesAction());
    this.subscriptions.add(this.store.pipe(select(selectHistoricalGamesState))
      .subscribe( games => {
        if (games && games.length > 0) {
          this.games = games;
        }
      }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getGame(gameId: string) {
    this.store.dispatch(gameActions.getGameAction({ gameId }));
  }
}
