import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.css'],
})
export class ProfileMenuComponent {
  @Output() profileClicked: EventEmitter<void> = new EventEmitter();
  @Output() logoutClicked: EventEmitter<void> = new EventEmitter();
}
