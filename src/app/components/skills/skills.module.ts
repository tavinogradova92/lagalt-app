import { ColouredLabelComponent } from './../coloured-label/coloured-label.component';
import { CrossBoxComponent } from './cross-box/cross-box.component';
import { SkillsModalComponent } from './skills-modal/skills-modal.component';
import { SkillsContainer } from './skillls-container/skills-container.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    SkillsContainer,
    SkillsModalComponent,
    CrossBoxComponent,
    ColouredLabelComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [SkillsContainer],
})
export class SkillsModule {}
