import { Session } from './../../models/session.model';
import { LoginFacade } from './../../views/authentication/login.facade';
import { SessionFacade } from '../../state/session/session.facade';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnDestroy {
  user: User;
  private readonly user$: Subscription;
  logo: SafeHtml;

  constructor(
    private sessionFacade: SessionFacade,
    private loginFacade: LoginFacade,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {
    this.user$ = this.sessionFacade
      .getSession()
      .subscribe((session: Session) => {
        this.user = session && session.user;
      });
  }

  ngOnInit() {
    this.logo = this.sanitizer.bypassSecurityTrustHtml(
      '<svg id="Capa_1" enable-background="new 0 0 502 502" height="512" viewBox="0 0 502 502" width="512" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="251" x2="251" y1="547.748" y2="132.127"><stop offset="0" stop-color="#53aae6"/><stop offset="1" stop-color="#a4d2f0"/></linearGradient><linearGradient id="SVGID_2_" gradientUnits="userSpaceOnUse" x1="418.062" x2="418.062" y1="345.559" y2="278.332"><stop offset="0" stop-color="#ea7d32"/><stop offset="1" stop-color="#f0b160"/></linearGradient><g><circle cx="251" cy="251" fill="url(#SVGID_1_)" r="182.218"/><path d="m279.153 354.174c0-9.718-7.943-17.549-17.66-17.42-3.485.047-6.983.07-10.493.07-64.081 0-124.525-7.677-170.574-21.629 5.634 14.962 13.173 28.988 22.333 41.779 49.599 10.857 104.04 14.709 148.241 14.709 3.572 0 7.224-.026 10.945-.08 9.537-.138 17.208-7.891 17.208-17.429z" fill="#04a5de"/><path d="m433.218 251c0-3.342-.096-6.662-.274-9.96h-76.322c-2.51-69.374-31.46-125.661-88.229-171.427-5.725-.542-11.525-.831-17.392-.831s-11.667.289-17.392.831c-56.77 45.766-85.72 102.053-88.229 171.427h-76.324c-.178 3.298-.274 6.618-.274 9.96s.096 6.662.274 9.96h76.322c2.51 69.374 31.46 125.661 88.229 171.427 5.725.542 11.525.831 17.392.831s11.667-.289 17.392-.831c56.77-45.767 85.72-102.053 88.229-171.427h76.322c.179-3.298.276-6.618.276-9.96zm-252.764-81.775c13.814-32.866 37.532-62.434 70.546-87.971 33.014 25.537 56.732 55.105 70.546 87.971 9.19 21.864 14.169 45.449 15.161 71.815h-171.414c.992-26.365 5.971-49.95 15.161-71.815zm141.092 163.55c-13.814 32.866-37.532 62.434-70.546 87.971-33.014-25.537-56.732-55.105-70.546-87.971-9.19-21.864-14.169-45.449-15.161-71.815h171.413c-.991 26.365-5.97 49.95-15.16 71.815z" fill="#04a5de"/><path d="m502 251c0-34.341-47.637-54.263-80.426-64.196 3.245 8.619 5.861 17.546 7.78 26.73 32.176 11.735 49.739 25.649 49.739 37.466 0 26.273-86.774 62.917-228.093 62.917s-228.093-36.644-228.093-62.917c0-11.817 17.563-25.73 49.739-37.466 1.92-9.184 4.535-18.111 7.78-26.73-32.71 9.909-80.426 29.826-80.426 64.196 0 25.672 27.048 47.64 78.219 63.527 46.314 14.378 107.676 22.297 172.781 22.297s126.467-7.919 172.781-22.297c51.171-15.887 78.219-37.855 78.219-63.527z" fill="#f2d472"/><circle cx="418.062" cy="304.422" fill="url(#SVGID_2_)" r="36.944"/><g fill="#bdebff"><path d="m406.235 223.433c-4.509 0-8.602-3.07-9.71-7.647-2.466-10.181-6.03-20.137-10.592-29.593-2.4-4.975-.313-10.952 4.661-13.353 4.975-2.4 10.952-.311 13.352 4.661 5.175 10.727 9.219 22.023 12.017 33.575 1.3 5.367-1.997 10.773-7.364 12.073-.792.192-1.585.284-2.364.284z"/><path d="m372.751 157.768c-2.833 0-5.648-1.197-7.626-3.526-2.875-3.385-5.934-6.679-9.09-9.791-3.933-3.878-3.978-10.209-.1-14.143 3.877-3.932 10.209-3.978 14.142-.1 3.574 3.524 7.037 7.254 10.291 11.086 3.576 4.209 3.061 10.52-1.148 14.096-1.881 1.596-4.181 2.378-6.469 2.378z"/></g><g><ellipse cx="163.114" cy="201.615" fill="#eaadcd" rx="14.936" ry="12.003"/><ellipse cx="338.885" cy="201.615" fill="#eaadcd" rx="14.936" ry="12.003"/><circle cx="188.721" cy="171.997" fill="#fff" r="29.618"/><circle cx="313.279" cy="171.997" fill="#fff" r="29.618"/><g fill="#3b3b44"><g><circle cx="188.721" cy="171.997" r="17.652"/><circle cx="313.279" cy="171.997" r="17.652"/></g><path d="m251 202.557c-5.248 0-10.495-1.984-14.776-5.954-2.025-1.877-2.145-5.041-.267-7.065 1.878-2.025 5.042-2.143 7.066-.267 4.697 4.354 11.257 4.354 15.954 0 2.023-1.879 5.188-1.759 7.066.267 1.877 2.024 1.758 5.189-.267 7.065-4.281 3.969-9.528 5.954-14.776 5.954z"/></g></g></g></svg>'
    );
  }

  onProfileClick(): void {
    this.router.navigateByUrl(`/users/${this.user.id}`);
  }

  logout(): void {
    this.loginFacade.logout();
  }

  ngOnDestroy(): void {
    this.user$.unsubscribe();
  }
}
