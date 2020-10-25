import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faTimes, faEquals, faMedal } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-winner-dialog',
  templateUrl: './winner-dialog.component.html',
  styleUrls: ['./winner-dialog.component.scss']
})
export class WinnerDialogComponent implements OnInit {

  faMedal = faMedal;
  faTimes = faTimes;
  faCircle = faCircle;
  faEquals = faEquals;
  winner: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {
    this.winner = data;
  }

  ngOnInit(): void {
  }

}
