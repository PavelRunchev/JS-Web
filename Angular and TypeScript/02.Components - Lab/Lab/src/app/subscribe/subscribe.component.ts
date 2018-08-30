import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Game } from '../domain/game';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent implements OnInit {
  @Input('subGame') subGame: Game;
  @Output() notification = new EventEmitter<string>();
  isClicked: boolean = false;
  constructor() { }

  showSubscribtion() {
    this.isClicked = !this.isClicked;
    this.notification.emit('subscriobtion success');
  }

  ngOnInit() {
 
  }

}
