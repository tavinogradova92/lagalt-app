import { Project } from 'src/app/models/project.model';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  p: number = 1;
  projects: Project[] = [];

  constructor(private router: Router, private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectService.getAllProjects().subscribe((projects) => {
      this.projects = projects;
    });
  }

  toProjectDetails(projectId: number): void {
    this.router.navigateByUrl(`/projects/${projectId}`);
  }
}
