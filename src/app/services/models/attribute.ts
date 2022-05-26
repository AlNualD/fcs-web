export interface Attribute{

    id: number,
    name:	string,
    amount: number,
    modification: number,
    trainedSaveRoll:	boolean
}

export interface AttributeUpdate {
  name:	string,
  amount: number,
  trainedSaveRoll:	boolean
}

export function EmptyAttribute () : Attribute{
  return {
    id: -1,
    name: "",
    amount: 0,
    modification: 0,
    trainedSaveRoll: false
  };
}

