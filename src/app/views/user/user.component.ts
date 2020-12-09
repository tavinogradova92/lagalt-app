import { ModalService } from '../../components/skills-modal/skills-modal.service';
import { Skill } from './../../models/skill.model';
import { SkillService } from './../../services/skill.service';
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
  allSkills: Skill[] = [];
  availableSkills: Skill[] = [];
  activeProjects: Project[] = [];
  toggled: boolean;
  patchResponseMessage: string;
  patchError = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private projectService: ProjectService,
    private skillService: SkillService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.route.data
      .pipe(pluck('0'))
      .subscribe((userResponse: ResponseObject) => {
        this.user = userResponse.data as User;
        this.getActiveProjectsFromUser();
      });

    this.skillService.getAllSkills().subscribe((response: ResponseObject) => {
      this.allSkills = response.data as Skill[];
      this.availableSkills = this.getAvailableSkills();
    });
  }

  private getActiveProjectsFromUser(): void {
    this.projectService
      .getActiveProjectsFromUser(this.user.id)
      .subscribe((projectResponse: ResponseObject) => {
        this.activeProjects = projectResponse.data as Project[];
      });
  }

  deleteBoxClicked(skillToDelete: Skill): void {
    this.user.skills = this.user.skills.filter(
      (skill) => skillToDelete.id !== skill.id
    );
    this.availableSkills.push(skillToDelete);
    this.sendUpdate({ skills: this.user.skills });
  }

  toProjectDetails(projectId: number): void {
    this.router.navigateByUrl(`/projects/${projectId}`);
  }

  addNewSkill(newSkill: Skill): void {
    this.user.skills = [...this.user.skills, newSkill];
    this.availableSkills = this.availableSkills.filter(
      (skill) => newSkill.id !== skill.id
    );
    this.sendUpdate({ skills: this.user.skills });
  }

  toggleHidden(toggled: boolean): void {
    this.toggled = !this.toggled;
    this.sendUpdate({ hidden: toggled });
  }

  sendUpdate(updatedField: any): void {
    const user: User = Object.assign({ id: this.user.id }, updatedField);
    this.patchResponseMessage = '';
    this.userService.updateUser(user).subscribe((response) => {
      this.patchError = !!response;
      this.patchResponseMessage = this.patchError
        ? 'There was an error updating the profile. Please try again later.'
        : '';
    });
  }

  getAvailableSkills(): Skill[] {
    const usersSkillIds = this.user.skills.map((skill) => skill.id);
    return this.allSkills.filter((skill) => !usersSkillIds.includes(skill.id));
  }

  openModal(): void {
    this.modalService.open('skills-modal');
  }
}
