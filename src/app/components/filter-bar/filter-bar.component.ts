import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Industry } from 'src/app/models/industry.model';
import { IndustryService } from 'src/app/services/industry.service';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css'],
})
export class FilterBarComponent implements OnInit {
  @Output() industryChosen: EventEmitter<number> = new EventEmitter();
  @Output() resetClicked: EventEmitter<any> = new EventEmitter();
  @Output() popularSorterClicked: EventEmitter<any> = new EventEmitter();
  @Output() newSorterClicked: EventEmitter<any> = new EventEmitter();

  industryChoice: FormGroup;
  industries: Industry[] = [];
  svgPopular: SafeHtml;
  svgNew: SafeHtml;
  popularSelected = false;
  newSelected = false;

  constructor(
    private industryService: IndustryService,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.industryChoice = this.fb.group({
      industry: '',
    });
    this.industryService.getAllIndustries().subscribe((industries) => {
      this.industries = industries;
    });
    this.svgPopular = this.sanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24"><rect fill="none" height="24" width="24"/><path d="M19,5h-2V3H7v2H5C3.9,5,3,5.9,3,7v1c0,2.55,1.92,4.63,4.39,4.94c0.63,1.5,1.98,2.63,3.61,2.96V19H7v2h10v-2h-4v-3.1 c1.63-0.33,2.98-1.46,3.61-2.96C19.08,12.63,21,10.55,21,8V7C21,5.9,20.1,5,19,5z M5,8V7h2v3.82C5.84,10.4,5,9.3,5,8z M19,8 c0,1.3-0.84,2.4-2,2.82V7h2V8z"/></svg>');
    this.svgNew = this.sanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M23 12l-2.44-2.78.34-3.68-3.61-.82-1.89-3.18L12 3 8.6 1.54 6.71 4.72l-3.61.81.34 3.68L1 12l2.44 2.78-.34 3.69 3.61.82 1.89 3.18L12 21l3.4 1.46 1.89-3.18 3.61-.82-.34-3.68L23 12zm-10 5h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>');
  }

  onPopularClicked(): void {
    this.popularSorterClicked.emit();
    this.popularSelected = true;
    this.newSelected = false;
  }

  onNewClicked(): void {
    this.newSorterClicked.emit();
    this.popularSelected = false;
    this.newSelected = true;
  }

  onIndustryChosen(): void {
    this.industryChosen.emit(parseInt(this.industryChoice.value.industry));
  }

  onResetClicked(): void {
    this.resetClicked.emit();
    this.industryChoice = this.fb.group({
      industry: '',
    });
    this.popularSelected = false;
    this.newSelected = false;
  }
}
