import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'coloured-label',
  template: `
    <div class="label-container" [ngStyle]="colorStyle">
      {{ text }}
    </div>
  `,
  styleUrls: ['./coloured-label.component.css'],
})
export class ColouredLabelComponent implements OnInit {
  colorStyle: any;
  @Input() text: string;
  @Input() clickable: boolean;

  ngOnInit() {
    this.colorStyle = this.generateRandomColorStyle();
  }

  generateRandomColorStyle(): any {
    const color = Math.floor(Math.random() * 16777215).toString(16);
    return { color: '#' + color, border: '2px solid #' + color };
  }
}
