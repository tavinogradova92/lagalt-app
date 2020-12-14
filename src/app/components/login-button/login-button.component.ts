import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-button',
  template: `<button routerLink="/login" class="login-button">Login</button>`,
  styleUrls: ['./login-button.component.css'],
})
export class LoginButtonComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
