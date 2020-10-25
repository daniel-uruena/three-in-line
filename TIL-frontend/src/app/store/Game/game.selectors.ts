import { GameState } from './game.reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface State {
  gameState: GameState;
}

export const selectFeature = createFeatureSelector<GameState>('GameStore');


export const selectCurrentGameState = createSelector(selectFeature, (state) => state.game);
export const selectHistoricalGamesState = createSelector(selectFeature, (state) => state.historicalGames);
