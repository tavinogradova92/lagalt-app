import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'toggle-component',
  template: `
    <label class="toggle-control">
      <input type="checkbox" [checked]="checked" (click)="onToggle($event)" />
      <span class="control"></span>
    </label>
  `,
  styleUrls: ['./toggle.component.css'],
})
export class ToggleComponent {
  @Input() checked: boolean;
  @Output() toggle: EventEmitter<boolean> = new EventEmitter();

  onToggle(event): void {
    this.toggle.emit(event.target.checked);
  }
}
