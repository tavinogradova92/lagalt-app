import { Project } from 'src/app/models/project.model';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'project-simple',
  templateUrl: './project-simple.component.html',
  styleUrls: ['./project-simple.component.css'],
})
export class ProjectSimpleComponent {
  @Input() project: Project;
  @Output() projectClicked: EventEmitter<number> = new EventEmitter();

  onProjectClicked(projectId: number): void {
    this.projectClicked.emit(projectId);
  }
}
