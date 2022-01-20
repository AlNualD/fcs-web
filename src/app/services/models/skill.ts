import {Attribute} from "./attribute";

export class Skill{
  constructor(
    public id: number,
    public trainCoefficient: number,
    public canBeTrained:	boolean,
    public attribute: Attribute,
    public value: number,
    public name:	string,
    public definition:	string,
    public description:	string,
    public favorite:	boolean,
    public trait:	boolean
  ) {
  }
}
