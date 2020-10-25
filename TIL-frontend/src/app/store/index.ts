import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';

// tslint:disable-next-line:no-empty-interface
export interface AppState { }

export const appReducers: ActionReducerMap<AppState> = { };


export const metaReducers: MetaReducer<any>[] = !environment.production ? [] : [];
