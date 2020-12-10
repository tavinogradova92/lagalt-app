import { Skill } from './../../../models/skill.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'skill-label',
  template: `
    <div
      [ngClass]="{ clickable: clickable }"
      class="skill-container"
      [ngStyle]="colorStyle"
    >
      {{ skill.skill }}
    </div>
  `,
  styleUrls: ['./skill-label.component.css'],
})
export class SkillLabelComponent implements OnInit {
  colorStyle: any;
  @Input() skill: Skill;
  @Input() clickable: boolean;

  ngOnInit() {
    this.colorStyle = this.generateRandomColorStyle();
  }

  generateRandomColorStyle(): any {
    const color = Math.floor(Math.random() * 16777215).toString(16);
    return { color: '#' + color, border: '2px solid #' + color };
  }
}
