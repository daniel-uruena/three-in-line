import { IGame } from '../../models/Game';
import { Action, createReducer, on } from '@ngrx/store';
import * as gameActions from './game.actions';

export interface GameState {
  game: IGame;
  historicalGames: IGame[];
}

export const initialState: GameState = {
  game: undefined,
  historicalGames: []
};

const reducer = createReducer(
  initialState,
  on(gameActions.gameCreatedAction, (state, { game }) => {
    return {
      ...state,
      game
    };
  }),
  on(gameActions.historicalGamesLoadedAction, (state, { historicalGames }) => {
    return {
      ...state,
      historicalGames
    };
  }),
  on(gameActions.playerMovementSuccessAction, (state, { game }) => {
    return {
      ...state,
      game
    };
  }),
  on(gameActions.gameLoadedAction, (state, { game }) => {
    return {
      ...state,
      game
    };
  })
);

export function gameReducer(state: GameState | undefined, action: Action): any {
  return reducer(state, action);
}
