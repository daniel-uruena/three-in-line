import { AppState } from '../index';
import { GameState } from './game.reducers';
import { createSelector } from '@ngrx/store';

export interface State extends AppState {
  gameState: GameState;
}

export const selectFeature = (state: State) => state.gameState;

export const selectCurrentGameState = createSelector(selectFeature, (state) => state.game);
export const selectHistoricalGamesState = createSelector(selectFeature, (state) => state.historicalGames);
