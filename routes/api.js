const express = require("express")  
const Pokemon = require("../models/pokemon")

//fetch every pokemon data saved in mongooo

const router = express.Router();

router.get('/poke',async (req,res)=>{
   
     
        
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);


        //  pagination config

        const sid = (page-1)*limit;
        const eid = page * limit;

        const results = {};

        if(eid < 500){
            results.next = {
                page:page+1,
                limit:limit
            }
        }

        // checking borders 0 and 500

        if(sid > 0){
            results.previous = {
                page:page-1,
                limit:limit
            }
        }
        
        await Pokemon.find({})
        .then(rez=>{
            results.results = rez.slice(sid,eid); 
            res.send(results);
            }
        )
  

    });

module.exports = router;