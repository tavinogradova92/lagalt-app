import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

type PaneType = 'left' | 'right';

@Component({
  selector: 'slide-panel',
  template: `
    <div class="panes" [@slide]="activePane">
      <div><ng-content select="[leftPane]"></ng-content></div>
      <div><ng-content select="[rightPane]"></ng-content></div>
    </div>
  `,
  styleUrls: ['./slide-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('slide', [
      state('left', style({ transform: 'translateX(0) translateY(0)' })),
      state('right', style({ transform: 'translateX(-50%)' })),
      transition('* => *', animate(300)),
    ]),
  ],
})
export class SlidePanelComponent {
  @Input() activePane: PaneType = 'left';
}
