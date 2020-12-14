import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-creation',
  templateUrl: './project-creation.component.html',
  styleUrls: ['./project-creation.component.css']
})
export class ProjectCreationComponent implements OnInit {
  projectForm: FormGroup;
  patchResponseMessage: string;
  submitted = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
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
      projectImage: new FormControl('')
      });
  }

  sendUpdate(updatedField: Project): void {
    const newProject: Project = Object.create(updatedField);
    newProject.dateCreated = new Date();
    newProject.name = updatedField.name;
    newProject.description = updatedField.description;
    newProject.projectImage = updatedField.projectImage;
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
