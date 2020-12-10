import { FilterBarComponent } from './filter-bar/filter-bar.component';
import { TopTagsComponent } from './top-tags/top-tags.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { SkillLabelComponent } from './skills/skill-label/skill-label.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectSimpleComponent } from './project-simple/project-simple.component';
import { SkillsModalComponent } from './skills/skills-modal/skills-modal.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    ProjectSimpleComponent,
    SkillsModalComponent,
    SkillLabelComponent,
    SpinnerComponent,
    TopTagsComponent,
    FilterBarComponent,
  ],
  exports: [
    ProjectSimpleComponent,
    SkillsModalComponent,
    SkillLabelComponent,
    SpinnerComponent,
    TopTagsComponent,
    FilterBarComponent,
  ],
})
export class SharedComponentsModule {}
