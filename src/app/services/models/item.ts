export interface Item {
    id: number,
    name:	string,
    definition:	string,
    weight:	number,
    formula:	string,
    favorite:	boolean
}

export interface ItemUpdate {
  name:	string,
  definition:	string,
  weight:	number,
  formula:	string,
  favorite:	boolean
}

export function EmptyItem(): Item{
  return {
    id: -1,
    name:	"",
    definition:	"",
    weight:	0,
    formula:	"",
    favorite:	false
  };
}
