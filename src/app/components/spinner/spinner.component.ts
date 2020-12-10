import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'spinner',
  template: `
    <div class="spinner">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  `,
  styleUrls: ['./spinner.component.css'],
})
export class SpinnerComponent {
  constructor() {}

  ngOnInit(): void {}
}
