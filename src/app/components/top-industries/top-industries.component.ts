import { ResponseObject } from './../../models/response-object.model';
import { Industry } from './../../models/industry.model';
import { IndustryService } from './../../services/industry.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-top-industries',
  templateUrl: './top-industries.component.html',
  styleUrls: ['./top-industries.component.css'],
})
export class TopIndustriesComponent implements OnInit {
  industries: Industry[] = [];
  loading = true;
  @Output() industryClicked: EventEmitter<number> = new EventEmitter();

  constructor(private industryService: IndustryService) {}

  ngOnInit(): void {
    this.industryService
      .getTopIndustries()
      .subscribe((response: ResponseObject) => {
        this.industries = response.data as Industry[];
      });
  }

  onLoad(): void {
    this.loading = false;
  }
}
