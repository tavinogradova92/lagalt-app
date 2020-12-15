import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

@Component({
  selector: 'register-view',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  email: String = 'rune@mail.com';
  password: String = 'pass';
  loading = false;
  submitted = false;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    if (this.authenticationService.userValue) {
      this.router.navigate(['/']);
    }
  }

  onRegister() {
    this.submitted = true;

    this.loading = true;
    this.authenticationService
      .register(this.email, this.password)
      .pipe(first())
      .subscribe({
        next: () => {
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigateByUrl(returnUrl);
        },
        error: (error) => {
          this.loading = false;
        },
      });
  }
}
