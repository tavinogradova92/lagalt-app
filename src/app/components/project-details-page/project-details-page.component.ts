import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';


@Component({
  selector: 'app-project-details-page',
  templateUrl: './project-details-page.component.html',
  styleUrls: ['./project-details-page.component.css']
})
export class ProjectDetailsPageComponent implements OnInit {

  project!: Project;

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectService.getProject().subscribe((project: Project) => {
      this.project = project;
    });
  }

}
