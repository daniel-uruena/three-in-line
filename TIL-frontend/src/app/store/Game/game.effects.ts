import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { GameService } from '../../services/game.service';
import * as gameActions from './game.actions';
import { tap } from 'rxjs/operators';

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
          this.store.dispatch(gameActions.creationFailAction());
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
          this.store.dispatch(gameActions.historicalGamesFailAction());
        });
    })
  ), { dispatch: false });

  setPlayerMovement$ = createEffect(() => this.action$.pipe(
    ofType(gameActions.setPlayerMovementAction),
    tap((action) => {
      return this.gameService.setPLayerMovement(action.gameId, action.playerMovement)
        .subscribe(game => {
          this.store.dispatch(gameActions.playerMovementSuccessAction({ game }));
        }, error => {
          console.log(error);
          this.store.dispatch(gameActions.playerMovementFailAction());
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
          this.store.dispatch(gameActions.gameLoadFailAction());
        });
    })
  ), { dispatch: false });

  constructor(private action$: Actions,
              private store: Store<{}>,
              private gameService: GameService) {
  }
}
