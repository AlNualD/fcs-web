export enum Urls {
  getUserCharacters = "http://localhost:4200/api/v2/users/characters/", //"https://flexcharactersheet.herokuapp.com/api/v2/users/characters/",
  getCharacterInfo = "http://localhost:4200/api/v2/characters/",  //"https://flexcharactersheet.herokuapp.com/api/v2/characters/",
  getCharacterSpells = "http://localhost:4200/api/v2/characters/spells?character_id=",
  getCharacterAttributes = "http://localhost:4200/api/v2/characters/attributes?character_id=",
  getCharacterSkills = "http://localhost:4200/api/v2/characters/skills?character_id=",
  getCharacterInventory = "http://localhost:4200/api/v2/characters/inventory?character_id=",


  createCustomCharacter = "http://localhost:4200/api/v2/characters?user_id=",
  createDndCharacter1 = "http://localhost:4200/api/v2/dnd5/ru/character/basic?user_id=",
  createDndCharacter2 = "http://localhost:4200/api/v2/dnd5/ru/character/step2?character_id=",
  updateCharacter = "http://localhost:4200/api/v2/characters?character_id=",
  deleteCharacter = "http://localhost:4200/api/v2/characters?character_id=",

  addPicture = "http://localhost:4200/api/v2/characters/picture?character_id=",
  // curHpSet = "http://localhost:4200/api/v2/characters/hp?character_id =",

  createAttribute = "http://localhost:4200/api/v2/characters/attributes?character_id=",
  updateAttribute = "http://localhost:4200/api/v2/characters/attributes?attribute_id=",
  deleteAttribute = "http://localhost:4200/api/v2/characters/attributes?attribute_id=",

  createSkill = "http://localhost:4200/api/v2/characters/skills?character_id=",
  updateSkill = "http://localhost:4200/api/v2/characters/skills?skill_id=",
  deleteSkill = "http://localhost:4200/api/v2/characters/skills?skill_id=",
  addToFavoriteSkill = "http://localhost:4200/api/v2/characters/skills/favorite?skill_id=",
  addAttributeToSkill = "http://localhost:4200/api/v2/characters/skills/attribute?skill_id=",

  createSpell = "http://localhost:4200/api/v2/characters/spells?character_id=",
  updateSpell = "http://localhost:4200/api/v2/characters/spells?spell_id=",
  deleteSpell = "http://localhost:4200/api/v2/characters/spells?spell_id=",
  addToFavoriteSpell = "http://localhost:4200/api/v2/characters/spells/favorite?spell_id=",
  addAttributeToSpell = "http://localhost:4200/api/v2/characters/spells/attribute?spell_id=",

  createItem = "http://localhost:4200/api/v2/characters/inventory?character_id=",
  updateItem = "http://localhost:4200/api/v2/characters/inventory?item_id=",
  deleteItem = "http://localhost:4200/api/v2/characters/inventory?item_id=",
  addToFavoriteItem = "http://localhost:4200/api/v2/characters/items/favorite?item_id=",


  getDndRaces ="http://localhost:4200/api/v2/dnd5/races/ru",
  getDndClasses ="http://localhost:4200/api/v2/dnd5/classes/ru",

  roll = "http://localhost:4200/api/v2/roll/str?formula=",

  register = "http://localhost:4200/api/v3/register",
  auth = "http://localhost:4200/api/v3/auth",

}
