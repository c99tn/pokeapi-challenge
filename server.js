const express = require('express')
const next = require('next')

//init

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const mongoose= require ('mongoose');
const Pokemon= require ('./models/pokemon');
const router= require ('./routes/api');

app.prepare().then(() => {
  const server = express()
    const mongourl= "mongodb+srv://dpr99c:dpr99c@cluster0.pkjj8ib.mongodb.net/?retryWrites=true&w=majority";
    mongoose.connect(mongourl);

async function getPokemons(){

    let id=1;
    
    while (id < 501){ 
    const api = await fetch('https://pokeapi.co/api/v2/pokemon/' + id)
    const pokemons = await api.json()
 
    const Poke = new Pokemon({
     name:pokemons['name'],
     imageURL:pokemons['sprites']['other']['official-artwork']['front_default'],
     baseExperience:pokemons['base_experience'],
    })
 
    await Poke.save();
    console.log(pokemons['name']+' added to the DB');
    id += 1;
  }
 }

    Pokemon.findOne()
    .then(res => {
        if(res == null){
            //No pokemons found in mongo
            //fetch the top 500 pokemons from pokeapi
            getPokemons();
            }  
         }  
    )

    //routee to the api
    server.use('/api', router);
    
    server.get('*', (req, res) => {
        return handle(req, res)
    })

    server.listen(4000, (err) => {
        if (err) throw err
        console.log('Ready on http://localhost:4000')
    })
 })