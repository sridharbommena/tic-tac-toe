import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  computerMove="O";
  userMove="X";
  constructor() { }

  decideComputerMove(copyBoard:string[] | undefined,computerMove="O")
  {
    var bestValue = -1000;
    var nextMoveIndex;
    for(var i=0;i<copyBoard!.length;i++)
    {
      if(copyBoard![i]==null)
      {
        copyBoard[i] = computerMove;
        var moveValue = this.minMax(copyBoard,false);
        copyBoard[i] = null;

        if(moveValue>bestValue)
        {
          bestValue = moveValue;
          nextMoveIndex = i;
        }
      }
    }

    return nextMoveIndex;
  }

  isMovesLeft(board:string[] | undefined)
  {
    var movesLeft=false;
    board?.forEach(val => {
      if(val==null)
        movesLeft=true;
    });
    return movesLeft;
  }

  evaluate(board:string[] | undefined)
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
        board![a]!=null &&
        board![a] == board![b] &&
        board![a] == board![c]
       )
       {
          if(board![a]==this.computerMove)
            return 10;
          else if(board![a]==this.userMove)
            return -10;
       }
    }

    return 0;
  }

  minMax(board:string[] | undefined,isComputer:boolean)
  {
    var score = this.evaluate(board);

    if(score==10)
      return score;
    if(score==-10)
      return score;
    
    if(this.isMovesLeft(board)==false)
      return 0;
    
    if(isComputer)
    {
        var bestValue = -1000;

        board?.forEach((val,index)=>{
          if(val==null)
            {
              board[index] = this.computerMove;
              bestValue = Math.max(bestValue, this.minMax(board,!isComputer));
              board[index] = null;
            }
        })

       return bestValue;
    }
    else{
       var bestValue = 1000;

       board?.forEach((val,index)=>{
          if(val==null)
          {
            board[index] = this.userMove;
            bestValue = Math.min(bestValue, this.minMax(board,!isComputer));
            board[index] = null;
          }
       });
       return bestValue;
    }

  }

}
