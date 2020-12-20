import { Tag } from './../../../../models/tag.model';
import { Skill } from './../../../../models/skill.model';
import { ImageUploadFacade } from './../../../../state/image-upload/image-upload.facade';
import { ProjectFacade } from './../../projects.facade';
import { Subscription, Observable } from 'rxjs';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Project } from 'src/app/models/project.model';
import { Industry } from '../../../../models/industry.model';
import { IndustryService } from '../../../../services/industry.service';

@Component({
  selector: 'app-project-creation',
  templateUrl: './project-creation.component.html',
  styleUrls: ['./project-creation.component.css', '../../../views.styles.css'],
})
export class ProjectCreationComponent implements OnInit, OnDestroy {
  @Output() uploadImage: EventEmitter<File> = new EventEmitter();
  @Output() createProject: EventEmitter<Project> = new EventEmitter();
  @Output() projectCreated: EventEmitter<void> = new EventEmitter<void>();

  projectSuccess$: Subscription;
  imageSuccess$: Subscription;
  image$: Subscription;
  error$: Observable<string>;
  imageIsLoading$: Observable<boolean>;
  projectIsLoading$: Observable<boolean>;

  projectForm: FormGroup;
  fileToUpload: File;
  industries: Industry[] = [];
  industry: Industry;
  allSkills: Skill[] = [];
  neededSkills: Skill[] = [];
  imageUrl: string;

  constructor(
    private projectFacade: ProjectFacade,
    private imageUploadFacade: ImageUploadFacade,
    private industryService: IndustryService
  ) {
    this.imageSuccess$ = this.imageUploadFacade
      .success$()
      .subscribe((success) => {
        if (success) {
          this.prepareProject();
        }
      });

    this.projectSuccess$ = this.projectFacade
      .success$()
      .subscribe((success) => {
        if (success) {
          this.projectCreated.emit();
        }
      });

    this.image$ = this.imageUploadFacade.image$().subscribe((image) => {
      this.imageUrl = image;
    });

    this.error$ = this.projectFacade.error$();
    this.projectIsLoading$ = this.projectFacade.isLoading$();
    this.imageIsLoading$ = this.imageUploadFacade.isLoading$();
  }

  industrySelected(): void {
    const selectedIndustry = this.industries.find(
      (industry) => industry.id === this.industryId
    );

    this.industry = {
      id: selectedIndustry.id,
      name: selectedIndustry.name,
      image: selectedIndustry.image,
    };
  }

  ngOnInit(): void {
    this.projectForm = new FormGroup({
      name: new FormControl('Name', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      description: new FormControl('Some description', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]),
      industryId: new FormControl(-1, [Validators.required]),
      tags: new FormControl(''),
    });
    this.industryService.getAllIndustries().subscribe((industries) => {
      this.industries = industries;
    });
  }

  get industryId(): number {
    return parseInt(this.projectForm.get('industryId').value, 10);
  }

  addNewSkill(newSkill: Skill): void {
    this.neededSkills.push(newSkill);
  }

  removeSkill(skillToDelete: Skill): void {
    this.neededSkills = this.neededSkills.filter(
      (skill) => skillToDelete.id !== skill.id
    );
  }

  handleFileInput(event: any): void {
    this.fileToUpload = event.target.files[0];
  }

  upload(): void {
    this.uploadImage.emit(this.fileToUpload);
  }

  getTagsFromString(tagsString: string): string[] {
    const stringTags = tagsString.split(' ');
    const tags = stringTags
      .filter((tag) => tag[0] === '#')
      .map((tag) => tag.substring(1));
    return tags;
  }

  prepareProject(): void {
    const project = this.projectForm.value;
    // creating new project object
    const newProject: Project = Object.create(project);

    // values assigned from the user input
    newProject.name = project.name;
    newProject.description = project.description;
    newProject.industry = this.industry;
    newProject.neededSkills = this.neededSkills;
    newProject.tags = this.getTagsFromString(project.tags);

    newProject.projectImage = this.imageUrl;
    this.createProject.emit(newProject);
  }

  ngOnDestroy(): void {
    this.projectSuccess$.unsubscribe();
    this.imageSuccess$.unsubscribe();
  }
}
