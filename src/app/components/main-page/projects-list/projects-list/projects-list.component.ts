import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project.model';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { IndustryService } from 'src/app/services/industry.service';
import { Industry } from 'src/app/models/industry.model';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit {

  projects: Project[] = [];

  constructor(
    private router: Router,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.projectService.getAllProjects()
      .subscribe(projects => {
          this.projects = projects;
      })
  }

  onProjectClicked(projectId: number): void {
    this.router.navigateByUrl(`/projects/${projectId}`);
  }

}
