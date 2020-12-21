import { Skill } from '../../models/skill.model';
import { ResponseObject } from '../../models/response-object.model';
import { Project } from '../../models/project.model';
import { ProjectService } from '../../services/project.service';
import { UserService } from './../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from './../../models/user.model';
import { Component, OnInit } from '@angular/core';
import { pluck } from 'rxjs/operators';

@Component({
  selector: 'user-profile',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css', '../views.styles.css'],
})
export class UserComponent implements OnInit {
  user: User;
  allSkills: Skill[] = [];
  activeProjects: Project[] = [];
  toggled: boolean;
  patchResponseMessage: string;

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
        if (this.user != null) {
          this.getActiveProjectsFromUser();
        }
      });
  }

  private getActiveProjectsFromUser(): void {
    this.projectService
      .getActiveProjectsFromUser(this.user.id)
      .subscribe((projectResponse: ResponseObject) => {
        this.activeProjects = projectResponse.data as Project[];
      });
  }

  removeSkill(skillToDelete: Skill): void {
    this.user.skills = this.user.skills.filter(
      (skill) => skillToDelete.id !== skill.id
    );
    this.sendUpdate({ skills: this.user.skills });
  }

  addNewSkill(newSkill: Skill): void {
    this.user.skills.push(newSkill);
    this.sendUpdate({ skills: this.user.skills });
  }

  toProjectDetails(projectId: number): void {
    this.router.navigateByUrl(`/projects/${projectId}`);
  }

  toggleHidden(toggled: boolean): void {
    this.toggled = !this.toggled;
    this.sendUpdate({ hidden: toggled });
  }

  sendUpdate(updatedField: any): void {
    const user: User = Object.assign({ id: this.user.id }, updatedField);
    this.patchResponseMessage = '';
    this.userService.updateUser(user).subscribe((response) => {
      this.patchResponseMessage = !!response
        ? 'There was an error updating the profile. Please try again later.'
        : '';
    });
  }
}
