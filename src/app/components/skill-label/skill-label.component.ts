import { Skill } from './../../models/skill.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'skill-label',
  template: `
    <div>
      <div class="skill-container" [ngStyle]="generateRandomColorStyle()">
        {{ skill.skill }}
      </div>
    </div>
  `,
  styleUrls: ['./skill-label.component.css'],
})
export class SkillLabelComponent {
  @Input() skill: Skill;

  generateRandomColorStyle(): any {
    const color = Math.floor(Math.random() * 16777215).toString(16);
    return { color: '#' + color, border: '2px solid #' + color };
  }
}
