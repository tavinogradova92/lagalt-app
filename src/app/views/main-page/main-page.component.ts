import { pluck } from 'rxjs/operators';
import { Tag } from './../../models/tag.model';
import { ResponseObject } from './../../models/response-object.model';
import { TagsService } from './../../services/tag.service';
import { Project } from 'src/app/models/project.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  page = 1;
  projects: Project[] = [];
  topTags: Tag[] = [];
  searchText: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private tagService: TagsService
  ) {}

  ngOnInit(): void {
    this.route.data.pipe(pluck('0')).subscribe((response: ResponseObject) => {
      this.projects = response.data as Project[];
    });
    this.getTopTags();
  }

  onSearch(text: string): void {
    this.searchText = text;
  }

  getAllProjects(): void {
    this.projectService
      .getAllProjects()
      .subscribe((response: ResponseObject) => {
        this.projects = response.data as Project[];
      });
  }

  getPopularProjects(): void {
    this.projects.sort((a, b) =>
      a.projectActiveUsers.length < b.projectActiveUsers.length ? 1 : -1
    );
  }

  getNewProjects(): void {
    this.projects.sort((a, b) => (a.dateCreated < b.dateCreated ? 1 : -1));
  }

  getTopTags(): void {
    this.tagService
      .getPopularTags()
      .subscribe(
        (response: ResponseObject) => (this.topTags = response.data as Tag[])
      );
  }

  getProjectsFromTag(tagId: number): void {
    this.projectService
      .getProjectsFromTag(tagId)
      .subscribe(
        (response: ResponseObject) =>
          (this.projects = response.data as Project[])
      );
  }

  getProjectsByIndustry(industryId: number): void {
    this.projectService
      .getProjectsByIndustry(industryId)
      .subscribe((projects) => {
        this.projects = projects;
      });
  }

  toProjectDetails(projectId: number): void {
    this.router.navigateByUrl(`/projects/${projectId}`);
  }

  onPopularSorterClicked(): void {
    this.getPopularProjects();
  }

  onNewSorterClicked(): void {
    this.getNewProjects();
  }

  onIndustryChosen(industryId: number): void {
    if (industryId === 0) {
      this.getAllProjects();
    } else {
      this.getProjectsByIndustry(industryId);
    }
  }

  onFilterReset(): void {
    this.searchText = '';
    this.getAllProjects();
  }
}
