import { SkillsModule } from './skills/skills.module';
import { ProfileMenuComponent } from './profile-menu/profile-menu.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterBarComponent } from './filter-bar/filter-bar.component';
import { TopTagsComponent } from './top-tags/top-tags.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectSimpleComponent } from './project-simple/project-simple.component';
import { ApplicationListItemComponent } from './application-list-item/application-list-item.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [
    ProjectSimpleComponent,
    SpinnerComponent,
    TopTagsComponent,
    FilterBarComponent,
    ProfileMenuComponent,
    ApplicationListItemComponent,
  ],
  exports: [
    ProjectSimpleComponent,
    SpinnerComponent,
    TopTagsComponent,
    FilterBarComponent,
    ProfileMenuComponent,
    ApplicationListItemComponent,
    SkillsModule,
  ],
})
export class SharedComponentsModule {}
