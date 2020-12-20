import { SessionFacade } from './../../../state/session/session.facade';
import { Session } from './../../../models/session.model';
import { ProjectFacade } from './../projects.facade';
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
  public project!: Project;
  public projectId: number;
  public user: User;
  private readonly user$: Subscription;

  private readonly project$: Subscription;

  constructor(
    private projectFacade: ProjectFacade,
    private route: ActivatedRoute,
    private router: Router,
    private sessionFacade: SessionFacade
  ) {
    this.project$ = this.projectFacade
      .currentProject$()
      .subscribe((project: Project) => {
        this.project = project;
      });
    this.projectId = this.route.snapshot.params.id;
    this.user$ = this.sessionFacade
      .getSession()
      .subscribe((session: Session) => {
        this.user = session && session.user;
      });
  }

  ngOnInit(): void {
    this.projectFacade.getProject(this.projectId);
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
    this.project$.unsubscribe();
    this.user$.unsubscribe();
  }
}
