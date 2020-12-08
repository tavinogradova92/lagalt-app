import { Industry } from './../../models/industry.model';
import { IndustryService } from './../../services/industry.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-industries',
  templateUrl: './top-industries.component.html',
  styleUrls: ['./top-industries.component.css'],
})
export class TopIndustriesComponent implements OnInit {
  industries: Industry[] = [];

  constructor(
    private router: Router,
    private industryService: IndustryService
  ) {}

  ngOnInit(): void {
    this.industryService
      .getAllIndustries()
      .subscribe((industries: Industry[]) => {
        this.industries = industries;
      });
  }

  onIndustryClicked(industryId: number): void {
    this.router.navigateByUrl(`/projects/industry/${industryId}`);
  }
}
