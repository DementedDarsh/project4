const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const postImage = require("./postImagesModel");

const weaponSchema = Schema({
  imagePath: { type: String, required: true },
  name: { type: String, required: true },
  weaponDamage: { type: Number, required: true },
  attackSpeed: { type: Number, required: true },    
  critRate: { type: Number, required: true },  
  hitRate: { type: Number, required: true },  
  creatorID: { type: String, required: false },
});

const Weapon = mongoose.model("Weapon", weaponSchema);

module.exports = Weapon;
