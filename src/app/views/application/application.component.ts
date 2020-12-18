import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Application } from 'src/app/models/application.model';
import { ApplicationService } from 'src/app/services/application.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {

  constructor(private applicationService: ApplicationService) { }
  applicationForm: FormGroup;
  patchResponseMessage: string;

  ngOnInit(): void {
    this.applicationForm = new FormGroup({
      application: new FormControl('',
      [Validators.required,
       Validators.maxLength(255)])
    });

  }

  createApplication(application: Application): void {
    const newApplication: Application = Object.create(application);

    // Auto assign values.
    newApplication.applicationApproved = false;
    newApplication.applicationResolved = false;

    newApplication.application = application.application;

    this.patchResponseMessage = '';
    this.applicationService.createApplication(newApplication).subscribe(response => {
      this.patchResponseMessage = !!response ? 'An error ocurred when trying to submit your application. Try again.' : '';
    })
  }

  submitApplication(){
    this.createApplication(this.applicationForm.value);
  }

}
