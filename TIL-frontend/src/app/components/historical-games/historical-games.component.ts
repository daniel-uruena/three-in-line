import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IGame } from '../../models/Game';
import { Subscription } from 'rxjs';
import { selectHistoricalGamesState } from '../../store/Game/game.selectors';
import * as gameActions from '../../store/Game/game.actions';
import { faPlay, faMedal, faTimes, faEquals, faUser } from '@fortawesome/free-solid-svg-icons';
import { faEye, faCircle } from '@fortawesome/free-regular-svg-icons';
import { registerLocaleData } from '@angular/common';
import localeEsCo from '@angular/common/locales/es-CO';

@Component({
  selector: 'app-historical-games',
  templateUrl: './historical-games.component.html',
  styleUrls: ['./historical-games.component.scss']
})
export class HistoricalGamesComponent implements OnInit, OnDestroy {

  games: IGame[] = [];
  subscriptions: Subscription;
  faPlay = faPlay;
  faEye = faEye;
  faMedal = faMedal;
  faTimes = faTimes;
  faCircle = faCircle;
  faEquals = faEquals;
  faUser = faUser;

  constructor(private store: Store<{}>) {
    registerLocaleData(localeEsCo);
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
