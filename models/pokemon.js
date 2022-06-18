const mongoose = require("mongoose") 


// the pokemon schema
const pokemonSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    imageURL:{
        type:String,
        required: true
    },
    baseExperience:{
        type:Number,
        required: true
    },

});


module.exports = Pokemon = mongoose.model('Pokemons',pokemonSchema);