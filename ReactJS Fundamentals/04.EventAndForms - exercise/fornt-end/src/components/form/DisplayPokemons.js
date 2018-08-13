import React, { Component } from 'react';
import PokemonField from './formFields/PokemonField';

class DisplayPokemons extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pokemons: []
        }
    }

    componentDidMount() {
        fetch('http://localhost:5000/pokedex/pokedex')
        .then(data => {
            return data.json()
        })
        .then(d => {
            this.setState({pokemons: d.pokemonColection});
        });
    }

    render () {
        return (
            <div>
                <div style={({display: 'inline-block'})}>
                    <center><h1>Pokemons</h1></center>
                    {this.state.pokemons.map((p, i) => {
                        return <PokemonField key={i} data={p}/>
                    })}
                </div>
            </div>
        )
    }
}

export default DisplayPokemons;