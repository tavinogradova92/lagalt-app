import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Industry } from 'src/app/models/industry.model';
import { IndustryService } from 'src/app/services/industry.service';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';

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

  constructor(
    private industryService: IndustryService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.industryChoice = this.fb.group({
      industry: '',
    });
    this.industryService.getAllIndustries().subscribe((industries) => {
      this.industries = industries;
    });
  }

  onPopularClicked(): void {
    this.popularSorterClicked.emit();
  }

  onNewClicked(): void {
    this.newSorterClicked.emit();
  }

  onIndustryChosen(): void {
    this.industryChosen.emit(parseInt(this.industryChoice.value.industry));
  }

  onResetClicked(): void {
    this.resetClicked.emit();
    this.industryChoice = this.fb.group({
      industry: '',
    });
  }
}
