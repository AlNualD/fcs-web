import {Attribute} from "./attribute";

export class Spell {
  constructor(
    public id: number,
    public name:	string,
    public definition:	string,
    public description:	string,
    public formula:	string,
    public lvl:	string,
    public favorite:	boolean,
    public attribute:	Attribute,
    public difficulty: number
  ) {
  }
}
