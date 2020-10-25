import { createAction, props } from '@ngrx/store';
import { IGame } from '../../models/Game';
import { IPlayerMovement } from '../../models/PlayerMovement';

// New game actions
export const newGameAction = createAction('[GAME]New game');
export const gameCreatedAction = createAction('[GAME]New game created', props<{ game: IGame }>());

// Get of historical games actions
export const getHistoricalGamesAction = createAction('[GAME]Get historical of games');
export const historicalGamesLoadedAction = createAction('[GAME]Historical of games loaded', props<{ historicalGames: IGame[] }>());

// Players movements actions
export const setPlayerMovementAction = createAction('[GAME]Set player movement',
  props<{ gameId: string, playerMovement: IPlayerMovement }>());
export const showModalWinnerAction = createAction('[GAME]Show modal of winner', props<{ winner: string }>());
export const playerMovementSuccessAction = createAction('[GAME]Player movement success', props<{ game: IGame }>());

// Get previous game actions
export const getGameAction = createAction('[GAME]Get previous game', props<{ gameId: string }>());
export const gameLoadedAction = createAction('[GAME]Game loaded', props<{ game: IGame }>());

// Fail request action
export const requestFailAction = createAction('[GAME]Error in request to server', props<{ error: any }>());
