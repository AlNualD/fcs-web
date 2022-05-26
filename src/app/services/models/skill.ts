import {Attribute} from "./attribute";

export interface Skill{
     id: number,
     trainCoefficient: number,
     canBeTrained:	boolean,
     attribute?: Attribute,
     value: number,
     name:	string,
     definition:	string,
     description:	string,
     favorite:	boolean,
     trait:	boolean

}

export interface SkillUpdate {
  trainCoefficient: number,
  canBeTrained: boolean,
  value: number,
  name: string,
  definition: string,
  description: string,
  favorite: boolean,
  trait: boolean
}

export function EmptySkill () : Skill {
  return {
    id: -1,
    name: "",
    value: 0,
    trainCoefficient: 0,
    trait: false,
    canBeTrained: false,
    description: "",
    definition: "",
    attribute: undefined,
    favorite: false,
  }
}
