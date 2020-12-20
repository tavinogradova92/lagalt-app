import { ResponseObject } from './../../../models/response-object.model';
import { Skill } from './../../../models/skill.model';
import { ModalService } from './../skills-modal/skills-modal.service';
import { SkillService } from './../../../services/skill.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'skills-container',
  templateUrl: './skills-container.component.html',
  styleUrls: ['./skills-container.component.css'],
})
export class SkillsContainer implements OnInit {
  @Input() title: string;
  @Input() entitySkills: Skill[];
  @Output() addSkill: EventEmitter<Skill> = new EventEmitter();
  @Output() removeSkill: EventEmitter<Skill> = new EventEmitter();

  allSkills: Skill[] = [];
  availableSkills: Skill[] = [];
  constructor(
    private skillService: SkillService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.skillService.getAllSkills().subscribe((response: ResponseObject) => {
      this.allSkills = response.data as Skill[];
      this.availableSkills = this.getAvailableSkills();
    });
  }

  deleteBoxClicked(skillToDelete: Skill): void {
    // this.entitySkills = this.entitySkills.filter(
    //   (skill) => skillToDelete.id !== skill.id
    // );
    this.availableSkills.push(skillToDelete);
    this.removeSkill.emit(skillToDelete);
  }

  addNewSkill(newSkill: Skill): void {
    this.availableSkills = this.availableSkills.filter(
      (skill) => newSkill.id !== skill.id
    );
    this.addSkill.emit(newSkill);
  }

  getAvailableSkills(): Skill[] {
    const entitySkillIds = this.entitySkills.map((skill) => skill.id);
    return this.allSkills.filter((skill) => !entitySkillIds.includes(skill.id));
  }

  openModal(): void {
    this.modalService.open('skills-modal');
  }
}
