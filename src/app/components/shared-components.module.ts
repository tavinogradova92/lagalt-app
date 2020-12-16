import { ProfileMenuComponent } from './profile-menu/profile-menu.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ColouredLabelComponent } from './coloured-label/coloured-label.component';
import { FilterBarComponent } from './filter-bar/filter-bar.component';
import { TopTagsComponent } from './top-tags/top-tags.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectSimpleComponent } from './project-simple/project-simple.component';
import { SkillsModalComponent } from './skills/skills-modal/skills-modal.component';
import { ApplicationListItemComponent } from './application-list-item/application-list-item.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [
    ProjectSimpleComponent,
    SkillsModalComponent,
    SpinnerComponent,
    TopTagsComponent,
    FilterBarComponent,
    ColouredLabelComponent,
    ProfileMenuComponent,
    ApplicationListItemComponent,
  ],
  exports: [
    ProjectSimpleComponent,
    SkillsModalComponent,
    SpinnerComponent,
    TopTagsComponent,
    FilterBarComponent,
    ColouredLabelComponent,
    ProfileMenuComponent,
    ApplicationListItemComponent,
  ],
})
export class SharedComponentsModule {}
