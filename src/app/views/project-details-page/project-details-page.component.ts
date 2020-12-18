import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { Session } from '../../models/session.model';
import { SessionFacade } from 'src/app/session/session.facade';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project-details-page',
  templateUrl: './project-details-page.component.html',
  styleUrls: ['./project-details-page.component.css'],
})
export class ProjectDetailsPageComponent implements OnInit {
  public project!: Project;
  public projectId: number;
  public user: User;
  private readonly user$: Subscription;

  constructor(
    private projectService: ProjectService,
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
    this.projectService
      .getProject(this.projectId)
      .subscribe((project: Project) => {
        this.project = project;
      });
  }

  ownersSeparator(owners: User[]): string {
    let ownersArray = [];
    if (owners.length > 1) {
      for (let i = 0; i < owners.length; i++) {
        ownersArray.push(owners[i].name);
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

}
