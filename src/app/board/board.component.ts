import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  squareItems:string[] | undefined;
  winner:string | null | undefined;
  isXnext:boolean | undefined;
  isDisabled:boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.initNewGame();
  }

  initNewGame()
  {
    this.squareItems=new Array(9).fill(null);
    this.winner = null;
    this.isXnext = true;
    this.isDisabled = false;
  }

  get player()
  {
    return this.isXnext? 'X' : 'O';
  }

  makeMove(id:number)
  {
    if(!this.squareItems![id])
    {
      this.squareItems?.splice(id,1, this.player);
      this.isXnext = !this.isXnext;
    }
    this.winner = this.calculateWinner();

    if( this.squareItems!.every(value => value != null) && !this.winner )
    {
      console.log("tie!");
      this.winner = "it's a tie!"
    }
  }

  calculateWinner()
  {

    var sol = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ];

    for(var line of sol)
    {
       let [a, b, c] = line;

       if(
        this.squareItems![a]!=null &&
        this.squareItems![a] == this.squareItems![b] &&
        this.squareItems![a] == this.squareItems![c]
       )
       
      {
        this.isDisabled=true;
        return this.squareItems![a];
      }

    }

    return null;

  }

}
