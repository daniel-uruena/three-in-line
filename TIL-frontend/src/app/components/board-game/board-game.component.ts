import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board-game',
  templateUrl: './board-game.component.html',
  styleUrls: ['./board-game.component.scss']
})
export class BoardGameComponent implements OnInit {

  game;

  constructor() { }

  ngOnInit(): void {
  }

  newGame() {
    this.game = true;
  }
}
