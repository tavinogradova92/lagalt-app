import { Tag } from './../../models/tag.model';
import { ResponseObject } from './../../models/response-object.model';
import { TagsService } from './../../services/tag.service';
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
  topTags: Tag[] = [];

  constructor(
    private router: Router,
    private projectService: ProjectService,
    private tagService: TagsService
  ) {}

  ngOnInit(): void {
    this.getAllProjects();
    this.getTopTags();
  }

  getAllProjects() {
    this.projectService.getAllProjects().subscribe((projects) => {
      this.projects = projects;
    });
  }

  getTopTags() {
    this.tagService
      .getPopularTags()
      .subscribe(
        (response: ResponseObject) => (this.topTags = response.data as Tag[])
      );
  }

  getProjectsFromTag(tagId: number) {
    this.projectService
      .getProjectsFromTag(tagId)
      .subscribe(
        (response: ResponseObject) =>
          (this.projects = response.data as Project[])
      );
  }

  toProjectDetails(projectId: number): void {
    this.router.navigateByUrl(`/projects/${projectId}`);
  }
}
