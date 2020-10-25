import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HistoricalGamesComponent } from './components/historical-games/historical-games.component';
import { BoardGameComponent } from './components/board-game/board-game.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { GameEffects } from './store/Game/game.effects';
import { gameReducer } from './store/Game/game.reducers';

@NgModule({
  declarations: [
    AppComponent,
    HistoricalGamesComponent,
    BoardGameComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({ GameStore: gameReducer }),
    EffectsModule.forRoot([GameEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
