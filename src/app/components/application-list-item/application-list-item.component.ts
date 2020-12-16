import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Application } from 'src/app/models/application.model';

@Component({
  selector: 'app-application-list-item',
  templateUrl: './application-list-item.component.html',
  styleUrls: ['./application-list-item.component.css']
})
export class ApplicationListItemComponent implements OnInit {

  @Input() application: Application;
  @Output() applicationClicked: EventEmitter<number> = new EventEmitter();
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onApplicationClicked(applicationId: number): void {
    this.applicationClicked.emit(applicationId);
  }

  onReadApplicationClicked(applicationId: number): void {
    this.router.navigateByUrl(`/application/${applicationId}`);
  }

}
