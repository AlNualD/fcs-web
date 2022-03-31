export enum Urls {
  getUserCharacters = "http://localhost:4200/api/v2/users/characters/", //"https://flexcharactersheet.herokuapp.com/api/v2/users/characters/",
  getCharacterInfo = "http://localhost:4200/api/v2/characters/",  //"https://flexcharactersheet.herokuapp.com/api/v2/characters/",
  getCharacterSpells = "http://localhost:4200/api/v2/characters/spells?character_id=",
  getCharacterAttributes = "http://localhost:4200/api/characters/attributes?character_id=",
  getCharacterSkills = "http://localhost:4200/api/characters/skills?character_id=",
  getCharacterInventory = "http://localhost:4200/api/characters/inventory?character_id=",

  register = "http://localhost:4200/api/v3/register",
  auth = "http://localhost:4200/api/v3/auth",

}
