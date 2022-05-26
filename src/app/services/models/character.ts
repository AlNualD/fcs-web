export class Character {

  constructor(
    public id: number,
    public name: string,
    public classC: string,
    public race: string,
    public lvl: number,
    public healthDice: number,
    public hp_max: number,
    public hp_cur: number,
    public alignment:	string,
    public spells_total: number,
    public money: number,
    public description: string,
    public url:	string,
    public profBonus: number
  ) {
  }

}
export interface CharacterGet {
  id:number,
  name: string,
  classC: string,
  race: string,
  lvl: number,
  healthDice: number,
  hp_max: number,
  hp_cur: number,
  alignment:	string,
  spells_total: number,
  money: number,
  description: string,
  url:	string,
  profBonus: number
}
export interface CharacterUpdate {
  name: string,
  classC: string,
  race: string,
  lvl: number,
  healthDice: number,
  hp_max: number,
  hp_cur: number,
  alignment:	string,
  spells_total: number,
  money: number,
  description: string,
  url:	string,
  profBonus: number
}
