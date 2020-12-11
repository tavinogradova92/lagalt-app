import { Industry } from './../../models/industry.model';
import { IndustryService } from './../../services/industry.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-industries',
  templateUrl: './top-industries.component.html',
  styleUrls: ['./top-industries.component.css'],
})
export class TopIndustriesComponent implements OnInit {
  industries: Industry[] = [];
  loading = true;
  @Output() industryClicked: EventEmitter<number> = new EventEmitter();

  constructor(
    private router: Router,
    private industryService: IndustryService
  ) {}

  ngOnInit(): void {
    this.industryService
      .getTopIndustries()
      .subscribe((industries: Industry[]) => {
        this.industries = industries;
      });
  }

  onLoad() {
    this.loading = false;
  }
}
