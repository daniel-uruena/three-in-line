import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IGame } from '../models/Game';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.URL_API;
  }

  getHistoricalGames(): Observable<IGame[]> {
    return this.http.get<IGame[]>(this.apiUrl);
  }

  newGame(): Observable<IGame> {
    return this.http.post<IGame>(this.apiUrl, {});
  }

  getGame(gameId: string): Observable<IGame> {
    return this.http.get<IGame>(`${this.apiUrl}/${gameId}`);
  }

  setPLayerMovement(gameId: string, playerMovement: any): Observable<IGame> {
    return this.http.put<IGame>(`${this.apiUrl}/${gameId}`, playerMovement);
  }
}
