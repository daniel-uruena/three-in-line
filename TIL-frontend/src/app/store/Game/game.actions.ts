import { createAction, props } from '@ngrx/store';
import { IGame } from '../../models/Game';
import { IPlayerMovement } from '../../models/PlayerMovement';

// New game actions
export const newGameAction = createAction('[GAME]New game');
export const gameCreatedAction = createAction('[GAME]New game created', props<{ game: IGame }>());
export const creationFailAction = createAction('[GAME]Creation of new game fails');

// Get of historical games actions
export const getHistoricalGamesAction = createAction('[GAME]Get historical of games');
export const historicalGamesLoadedAction = createAction('[GAME]Historical of games loaded', props<{ historicalGames: IGame[] }>());
export const historicalGamesFailAction = createAction('[GAME]Request of historical of games did fail');

// Players movements actions
export const setPlayerMovementAction = createAction('[GAME]Set player movement',
  props<{ gameId: string, playerMovement: IPlayerMovement }>());
export const playerMovementSuccessAction = createAction('[GAME]Player movement success', props<{ game: IGame }>());
export const playerMovementFailAction = createAction('[GAME]Player movement did fail');

// Get previous game
export const getGameAction = createAction('[GAME]Get previous game', props<{ gameId: string }>());
export const gameLoadedAction = createAction('[GAME]Game loaded', props<{ game: IGame }>());
export const gameLoadFailAction = createAction('[GAME]Game load did fail');
