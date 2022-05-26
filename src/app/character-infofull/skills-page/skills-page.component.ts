import { Component, OnInit } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Skill} from "../../services/models/skill";
import {CharacterService} from "../../services/character.service";

@Component({
  selector: 'app-skills-page',
  templateUrl: './skills-page.component.html',
  styleUrls: ['./skills-page.component.scss']
})
export class SkillsPageComponent implements OnInit {

  showFavorites : boolean = false;

  isEmpty : boolean = false;

  addSkill : boolean = false;

  skills$ : Subject<Skill[]> = new Subject<Skill[]>()
  allSkills: Skill[] = [];
  curSkill$ : Subject<Skill> = new Subject<Skill>();

  constructor(private readonly characterService : CharacterService) { }

  ngOnInit(): void {
    this.characterService.skills$.subscribe(
      (val) => {
        this.isEmpty = false;

        if(val.length == 0) {
          this.isEmpty = true;
        }
        this.showFavorites = false;
        this.skills$.next(val);
        this.allSkills = val;
        this.addSkill = false;
      });
  }

  OnSkillClick(skill : Skill) {
    this.curSkill$.next(skill)
  }

  ShowFavorites() {
    this.showFavorites = !this.showFavorites;
    if(this.showFavorites) {
      this.skills$.next(this.allSkills.filter((skill) => skill.favorite));
    } else {
      this.skills$.next(this.allSkills);
    }
  }

  AddSkill(){
    this.addSkill = true;
  }
}
