import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'square-item',
  template: `
    <button *ngIf="!value" class="square empty" [disabled]="isDisabled">{{value}}</button>
    <button *ngIf="value == 'X'" class="square X" [disabled]="isDisabled">{{value}}</button>
    <button *ngIf="value == 'O'" class="square O" [disabled]="isDisabled">{{value}}</button>
  `,
  styles: []
})
export class SquareComponent{

  @Input()
  value!:string;

  @Input()
  isDisabled:boolean = false;
}
