import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';
import { ImageUploadService } from 'src/app/services/image-upload.service';

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

  constructor(
    private uploadService: ImageUploadService,
    private projectService: ProjectService
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
      });
  }

  handleFileInput(event) {
    this.fileToUpload = event.target.files[0];
  }

  sendUpdate(updatedField: Project): void {
    // creating new project object
    const newProject: Project = Object.create(updatedField);

    // automatically assigned values
    newProject.dateCreated = new Date();

    // values assigned from the user input
    newProject.name = updatedField.name;
    newProject.description = updatedField.description;

    // uploading project image to the database
    console.log(this.fileToUpload);
    this.uploadService.uploadImage(this.fileToUpload);
    this.fileToUpload = undefined;

    this.patchResponseMessage = '';
    this.projectService.createProject(newProject).subscribe((response) => {
      this.patchResponseMessage = !!response
        ? 'There was an error creating a project. Please try again later.'
        : '';
    });
    console.log(newProject);
  }

  onSubmit() {
    this.submitted = true;
    this.sendUpdate(this.projectForm.value);
    console.log(this.projectForm.value);
  }



}
