const express = require("express")  
const Pokemon = require("../models/pokemon")

// fetch only 12 pokemons per request from data saved in mongoDB

const router = express.Router();

router.get('/poke',async (req,res)=>{
   
    const page = parseInt(req.query.page);

    const sid = (page-1)*12;
    const eid = page *12;

    const results = {};
    
    if(eid < 500){
        results.next = {
            page:page+1,
            limit:12
             }
        }
    
     if(sid > 0){
         results.previous = {
             page:page-1,
             limit:12
            }
        }

    const pokemons = await Pokemon.find()
     .limit(12)
     .skip(sid)
     .exec();

     results.results = pokemons;
     res.send(results);
        
     //console.log(pokemons);
     
     //console.log(results);

    });


module.exports = router;