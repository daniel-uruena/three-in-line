import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { GameService } from '../../services/game.service';
import * as gameActions from './game.actions';
import { tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { WinnerDialogComponent } from '../../components/winner-dialog/winner-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class GameEffects {
  newGame$ = createEffect(() => this.action$.pipe(
    ofType(gameActions.newGameAction),
    tap(() => {
      return this.gameService.newGame()
        .subscribe(game => {
          this.store.dispatch(gameActions.gameCreatedAction({ game }));
        }, error => {
          console.error(error);
          this.store.dispatch(gameActions.requestFailAction(error));
        });
    })
  ), { dispatch: false });

  getHistoricalGames$ = createEffect(() => this.action$.pipe(
    ofType(gameActions.getHistoricalGamesAction),
    tap(() => {
      return this.gameService.getHistoricalGames()
        .subscribe( games => {
          this.store.dispatch(gameActions.historicalGamesLoadedAction({ historicalGames: games }));
        }, error => {
          console.error(error);
          this.store.dispatch(gameActions.requestFailAction(error));
        });
    })
  ), { dispatch: false });

  setPlayerMovement$ = createEffect(() => this.action$.pipe(
    ofType(gameActions.setPlayerMovementAction),
    tap((action) => {
      return this.gameService.setPLayerMovement(action.gameId, action.playerMovement)
        .subscribe(game => {
          if (game.winner) {
            this.store.dispatch(gameActions.showModalWinnerAction({ winner: game.winner }));
          }
          this.store.dispatch(gameActions.playerMovementSuccessAction({ game }));
        }, error => {
          console.log(error);
          this.store.dispatch(gameActions.requestFailAction(error));
        });
    })
  ), { dispatch: false });

  showModalWinner$ = createEffect(() => this.action$.pipe(
    ofType(gameActions.showModalWinnerAction),
    tap((action) => {
      this.dialog.open(WinnerDialogComponent, {
        data: action.winner
      });
    })
  ), { dispatch: false });

  getGame$ = createEffect(() => this.action$.pipe(
    ofType(gameActions.getGameAction),
    tap((action) => {
      return this.gameService.getGame(action.gameId)
        .subscribe(game => {
          this.store.dispatch(gameActions.gameLoadedAction({ game }));
        }, error => {
          console.log(error);
          this.store.dispatch(gameActions.requestFailAction(error));
        });
    })
  ), { dispatch: false });

  requestFail$ = createEffect(() => this.action$.pipe(
    ofType(gameActions.requestFailAction),
    tap( (action) => {
      this.snackBar.open(action.error, 'cerrar', { duration: 5000 });
    })
  ), { dispatch: false });

  constructor(private action$: Actions,
              private store: Store<{}>,
              private gameService: GameService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) {
  }
}
