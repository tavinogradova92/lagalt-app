import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent  {

  @Output() searchChanged: EventEmitter<string> = new EventEmitter();

  public onSearchTextUpdated(event): void {
    const text = event.target.value.trim();
    this.searchChanged.emit(text);
  }



}
