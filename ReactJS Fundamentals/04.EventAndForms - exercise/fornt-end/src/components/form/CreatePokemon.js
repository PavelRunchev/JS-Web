import React, { Component } from 'react';
import Input from './formFields/Input';

class CreatePokemon extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pokemonName: '', 
            pokemonImg: '',
            pokemonInfo: '',
        }
    }

    createPokemon(e) {
        e.preventDefault();

        let payload = {
            pokemonName: this.state.pokemonName,
            pokemonImg: this.state.pokemonImg,
            pokemonInfo: this.state.pokemonInfo
        };

        fetch('http://localhost:5000/pokedex/create', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
            })
            .then(res => {
                return res.json();
            })
            .then(d => {
                window.location.reload();
            });
            
    }
    

    render () {
        let validName = this.state.pokemonName !=='';
        let validImg = this.state.pokemonImg.startsWith('http');
        let validContent = this.state.pokemonInfo.length > 3
            && this.state.pokemonInfo.length < 50;
        return (
            <div>
                <h1>Logged</h1>
                <form onSubmit={this.createPokemon.bind(this)}>
                    <fieldset className='App'>
                        <Input data='pokeName'
                            name='Pokemon Name'
                            func={e => {this.setState({pokemonName: e.target.value})}}
                            valid={validName}
                        />
                        <Input data='pokeImg'
                            name='Pokemon image'
                            func={e => {this.setState({ pokemonImg: e.target.value})}}
                            valid={validImg}
                        />
                        <Input data='pokeBio'
                            name='Pokemon Info'
                            func={e => {this.setState({ pokemonInfo: e.target.value})}}
                            valid={validContent}
                        />
                        <input 
                            style={({ "display": validName && validImg && validContent === true ? '' : 'none' })}
                            type='submit' value='Create Pokemon'/>
                    </fieldset>
                </form>
            </div>
        )
    }
}

export default CreatePokemon;