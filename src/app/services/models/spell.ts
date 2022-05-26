import {Attribute} from "./attribute";

export interface Spell {
     id: number,
     name:	string,
     definition:	string,
     description:	string,
     formula:	string,
     lvl:	string,
     favorite:	boolean,
     attribute?:	Attribute,
     difficulty: number
}

export interface SpellUpdate {
  name: string,
  definition: string,
  description: string,
  formula: string,
  lvl: string,
  favorite: boolean,
  difficulty: number
}

export function EmptySpell() : Spell {
  return {
    id: -1,
    name:	"",
    definition:	"",
    description:	"",
    formula:	"",
    lvl:	"",
    favorite:	false,
    attribute:	undefined,
    difficulty: 1
  }
}
