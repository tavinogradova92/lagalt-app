import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopIndustriesComponent } from './top-industries.component';

describe('TopIndustriesComponent', () => {
  let component: TopIndustriesComponent;
  let fixture: ComponentFixture<TopIndustriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopIndustriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopIndustriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
