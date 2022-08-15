import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../utility/utility.service';

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
  computerThinikingText:string = "Thinking for next move...";
  showComputerThinkingText:boolean = false;

  constructor(private utility:UtilityService) { }

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

  get userPlayer()
  {
    return 'X';
  }

  get computerPlayer()
  {
    return 'O';
  }

  makeMove(id:number)
  {
    this.isDisabled = true;
    if(!this.squareItems![id])
    {
      this.squareItems?.splice(id,1, this.userPlayer);
      this.isXnext = !this.isXnext;
    }
    this.winner = this.calculateWinner();

    if( this.squareItems!.every(value => value != null) && !this.winner )
    {
      console.log("tie!");
      this.winner = " It's a tie!"
      this.showComputerThinkingText = false;
    }

    this.showComputerThinkingText = true;
    setTimeout(()=>
    {
      this.makeComputerMove();
      this.isDisabled = false;
      this.showComputerThinkingText = false;
    },1000);

    
  }

  makeComputerMove()
  {
    if(!this.winner)
    {
      this.squareItems![this.utility.decideComputerMove(this.squareItems)] = this.utility.computerMove;
      this.winner = this.calculateWinner();
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
        this.isDisabled = true;
        if(this.squareItems![a]==this.userPlayer)
            return " You!";
        else if(this.squareItems![a]==this.computerPlayer)
            return " Computer!";
        else
          return this.squareItems![a];
      }

    }

    return null;

  }

}
