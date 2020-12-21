import { ResponseObject } from './../../../models/response-object.model';
import { pluck } from 'rxjs/operators';
import { SessionFacade } from './../../../state/session/session.facade';
import { Session } from './../../../models/session.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Project } from 'src/app/models/project.model';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project-details-page',
  templateUrl: './project-details-page.component.html',
  styleUrls: ['./project-details-page.component.css'],
})
export class ProjectDetailsPageComponent implements OnInit, OnDestroy {
  public project: Project;
  public projectId: number;
  public checkIfParticipant = false;
  public user: User;
  private readonly user$: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sessionFacade: SessionFacade
  ) {
    this.projectId = this.route.snapshot.params.id;
    this.user$ = this.sessionFacade
      .getSession()
      .subscribe((session: Session) => {
        this.user = session && session.user;
      });
  }

  ngOnInit(): void {
    this.route.data.pipe(pluck('0')).subscribe((response: ResponseObject) => {
      if (response != null) {
        this.project = response.data as Project;
        this.checkIfActiveUser();
      }
    });
  }

  checkIfActiveUser(): void {
    for (const user of this.project.projectActiveUsers) {
      if (this.user.id === user.id) {
        this.checkIfParticipant = true;
        break;
      }
    }
  }

  ownersSeparator(owners: User[]): string {
    const ownersArray: string[] = [];
    if (owners.length > 1) {
      for (const owner of owners) {
        ownersArray.push(owner.name);
      }
      return ownersArray.join(' and ');
    }
    return owners[0].name;
  }

  participantsCounter(participants: User[]): number {
    return participants.length;
  }

  onApplyClicked(projectId: number): void {
    this.router.navigateByUrl(`/projects/${projectId}/apply`);
  }

  ngOnDestroy(): void {
    this.user$.unsubscribe();
  }
}
