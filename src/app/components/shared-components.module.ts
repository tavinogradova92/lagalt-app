import { SkillLabelComponent } from 'src/app/components/skill-label/skill-label.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectSimpleComponent } from './project-simple/project-simple.component';
import { SkillsModalComponent } from './skills-modal/skills-modal.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    ProjectSimpleComponent,
    SkillsModalComponent,
    SkillLabelComponent,
  ],
  exports: [ProjectSimpleComponent, SkillsModalComponent, SkillLabelComponent],
})
export class SharedComponentsModule {}
