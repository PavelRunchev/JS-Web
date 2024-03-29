const express = require('express');

const router = new express.Router();

const pokemons = require('./../data/pokemons');


router.post('/create',(req,res,next)=>{

    pokemons.addPokem((req.body));
    return res.status(200).json(pokemons.retrivePokemons());
});

router.get('/pokedex',(req,res,next)=>{
    console.log('geting');
    console.log(pokemons.retrivePokemons());
    let pokemonColection = (pokemons.retrivePokemons());
    return res.status(200).json({
        pokemonColection
    });
});

module.exports = router;