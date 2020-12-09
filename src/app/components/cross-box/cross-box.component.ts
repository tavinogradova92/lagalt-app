import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cross-box',
  template: ` <div (click)="boxClicked.emit()" class="box"></div> `,
  styleUrls: ['./cross-box.component.css'],
})
export class CrossBoxComponent {
  @Output() boxClicked: EventEmitter<void> = new EventEmitter();
}
