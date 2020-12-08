import { ResponseObject } from './../../models/response-object.model';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from './../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from './../../models/user.model';
import { Component, OnInit } from '@angular/core';
import { pluck } from 'rxjs/operators';

@Component({
  selector: 'user-profile',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  user: User;
  activeProjects: Project[];
  toggled: boolean;
  patchResponseMessage: string;
  patchError = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.route.data
      .pipe(pluck('0'))
      .subscribe((userResponse: ResponseObject) => {
        this.user = userResponse.data as User;
        this.getActiveProjectsFromUser();
      });
  }

  private getActiveProjectsFromUser(): void {
    this.projectService
      .getActiveProjectsFromUser(this.user.id)
      .subscribe((projectResponse: ResponseObject) => {
        this.activeProjects = projectResponse.data as Project[];
      });
  }

  toProjectDetails(projectId): void {
    this.router.navigateByUrl(`/projects/${projectId}`);
  }

  toggleHidden(toggled): void {
    this.toggled = !this.toggled;
    this.sendUpdate({ hidden: toggled });
  }

  sendUpdate(updatedField): void {
    const user: User = Object.assign({ id: this.user.id }, updatedField);
    this.patchResponseMessage = '';
    this.userService.updateUser(user).subscribe((response) => {
      this.patchError = !!response;
      this.patchResponseMessage = this.patchError
        ? 'There was an error updating the profile. Please try again later.'
        : '';
    });
  }
}
