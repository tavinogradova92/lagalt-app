import { Component, OnInit } from '@angular/core';
import { Application } from 'src/app/models/application.model';
import { ApplicationService } from 'src/app/services/application.service';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.css']
})
export class ApplicationListComponent implements OnInit {

  constructor(private applicationService: ApplicationService) { }

  applications: Application[];
  pageNum: 1;

  ngOnInit(): void {
    this.applicationService.getApplicationsForProject().subscribe((applications) => {
      this.applications = applications;
    })

  }
}
