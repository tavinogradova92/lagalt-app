import { Project } from 'src/app/models/project.model';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'project-simple',
  templateUrl: './project-simple.component.html',
  styleUrls: ['./project-simple.component.css'],
})
export class ProjectSimpleComponent {
  @Input() project: Project;
  @Output() projectClicked: EventEmitter<number> = new EventEmitter();

  constructor(private router: Router) {}

  onProjectClicked(projectId: number): void {
    this.projectClicked.emit(projectId);
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
