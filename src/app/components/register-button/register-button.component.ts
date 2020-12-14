import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-button',
  template: ` <button routerLink="/register" class="register-button">
    Register
  </button>`,
  styleUrls: ['./register-button.component.css'],
})
export class RegisterButtonComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
