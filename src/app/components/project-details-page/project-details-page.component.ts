import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-details-page',
  templateUrl: './project-details-page.component.html',
  styleUrls: ['./project-details-page.component.css'],
})
export class ProjectDetailsPageComponent implements OnInit {
  public project!: Project;
  public projectId: number;

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute
  ) {
    this.projectId = this.route.snapshot.params.id;
  }

  ngOnInit(): void {
    this.projectService
      .getProject(this.projectId)
      .subscribe((project: Project) => {
        this.project = project;
      });
  }
}
