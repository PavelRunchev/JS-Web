import { Component } from '@angular/core';
import { appAnimations } from './app.animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: appAnimations
})
export class AppComponent {
  state = "normal";
  wildState = "normal";
  list = ['Milk', 'Sugar', 'Bread'];

    onAdd(item) {
      this.list.push(item);
    }

    onDelete(item) {
      this.list.splice(this.list.indexOf(item), 1);
    }

    onAnimate() {
      this.state == "normal" 
       ?  this.state = "highlighted" 
       : this.state = "normal"

       this.wildState == "normal" 
       ?  this.wildState = "highlighted" 
       : this.wildState = "normal"
    }

    onShrink() {
      this.wildState = "shrunken";
    }

    animationStart(event) {
      console.log(event);
    }

    animationEnd(event) {
      console.log(event);
    }
}
