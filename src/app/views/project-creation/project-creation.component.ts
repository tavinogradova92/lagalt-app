import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';
import { ImageUploadService } from 'src/app/services/image-upload.service';
import { Industry } from '../../models/industry.model';
import { IndustryService } from '../../services/industry.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-project-creation',
  templateUrl: './project-creation.component.html',
  styleUrls: ['./project-creation.component.css']
})
export class ProjectCreationComponent implements OnInit {
  projectForm: FormGroup;
  fileToUpload: File;
  patchResponseMessage: string;
  submitted = false;
  industries: Industry[] = [];
  industry: Industry;
  imageUrl: string;

  constructor(
    private uploadService: ImageUploadService,
    private projectService: ProjectService,
    private industryService: IndustryService,
  ) { }

  ngOnInit() {
    this.projectForm = new FormGroup({
      name: new FormControl('', 
        [  Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)]),
      description: new FormControl('', 
        [  Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)]),
      industryId: new FormControl(null,
        [ Validators.required])
    });
    this.industryService.getAllIndustries().subscribe((industries) => {
      this.industries = industries;
    });
  }

  handleFileInput(event) {
    this.fileToUpload = event.target.files[0];
  }

  createProject(project: any): void {
    // creating new project object
    const newProject: Project = Object.create(project);

    // automatically assigned values
    newProject.dateCreated = new Date();
    newProject.progress = 0;
    newProject.deleted = false;

    // values assigned from the user input
    newProject.name = project.name;
    newProject.description = project.description;
    let chosenIndustry = this.industryService.getIndustry(project.industryId).subscribe(data =>
      this.industry = data);
    newProject.industry = this.industry;

    // uploading project image to the database
    this.uploadService.uploadImage(this.fileToUpload).subscribe((data) =>
      this.imageUrl = data);
    this.fileToUpload = undefined;
    newProject.projectImage = this.imageUrl;
    this.patchResponseMessage = '';
    this.projectService.createProject(newProject).subscribe((response) => {
      this.patchResponseMessage = !!response
        ? 'There was an error creating a project. Please try again later.'
        : '';
    });
  }

  onSubmit() {
    this.submitted = true;
    this.createProject(this.projectForm.value);
  }



}
