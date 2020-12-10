import { Tag } from './../../models/tag.model';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'top-tags',
  template: `
    <div class="container">
      <h2>Top tags:</h2>
      <p (click)="tagClicked.emit(tag.id)" class="tag" *ngFor="let tag of tags">
        #{{ tag.name }}
      </p>
    </div>
  `,
  styleUrls: ['./top-tags.component.css'],
})
export class TopTagsComponent {
  @Input() tags: Tag[];
  @Output() tagClicked: EventEmitter<number> = new EventEmitter();
}
