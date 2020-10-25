import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectCurrentGameState } from '../../store/Game/game.selectors';
import { IGame } from '../../models/Game';
import * as gameActions from '../../store/Game/game.actions';
import { IPlayerMovement } from '../../models/PlayerMovement';
import { faPlay, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-board-game',
  templateUrl: './board-game.component.html',
  styleUrls: ['./board-game.component.scss']
})
export class BoardGameComponent implements OnInit, OnDestroy {

  game: IGame;
  subscriptions: Subscription;
  faPlay = faPlay;
  faTimes = faTimes;
  faCircle = faCircle;
  board = {
    1: undefined,
    2: undefined,
    3: undefined,
    4: undefined,
    5: undefined,
    6: undefined,
    7: undefined,
    8: undefined,
    9: undefined
  };

  constructor(private store: Store<{}>) {
    this.subscriptions = new Subscription();
  }

  ngOnInit(): void {
    this.subscriptions.add(this.store.pipe(select(selectCurrentGameState))
      .subscribe(game => {
        if (game) {
          this.game = game;
          this.refreshBoard();
          this.store.dispatch(gameActions.getHistoricalGamesAction());
        }
      }));
  }

  refreshBoard(): void {
    this.board = {
      1: undefined,
      2: undefined,
      3: undefined,
      4: undefined,
      5: undefined,
      6: undefined,
      7: undefined,
      8: undefined,
      9: undefined
    };
    this.game.XMovements.forEach(movement => {
      this.board[movement] = 'X';
    });
    this.game.OMovements.forEach(movement => {
      this.board[movement] = 'O';
    });
  }

  setPlayerMovement(cell: number): void {
    if (!this.game.isFinished) {
      const playerMovement: IPlayerMovement = {
        XMovement: this.game.turn === 'X' ? cell : undefined,
        OMovement: this.game.turn === 'O' ? cell : undefined,
      };
      this.store.dispatch(gameActions.setPlayerMovementAction({
        gameId: this.game._id,
        playerMovement
      }));
    }
  }

  newGame(): void {
    this.store.dispatch(gameActions.newGameAction());
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
