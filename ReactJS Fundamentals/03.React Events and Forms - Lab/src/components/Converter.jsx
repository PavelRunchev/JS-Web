import React, { Component } from 'react';
import './Converter.css';

export default class Converter extends Component {
    constructor (props) {
        super(props);

        this.state = {
            eur: 0,
            usd: 0
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event) {
        let eur = 0;
        let usd = 0;

        //validation
        if(event.target.value === '') {
            return
        }

        switch(event.target.name) {
            case 'usd':
            usd = Number(event.target.value);
            try {
                eur = Number(event.target.value) / 1.17;
            } catch(err) {}
            break;
            case 'eur':  
            eur = event.target.value;        
            try {
                usd = Number(event.target.value) * 1.17;
            } catch(err) {}
            break;
        }

        this.setState({
            [event.target.name]: event.target.value,
            usd: usd,
            eur: eur
        });
    }

    onSubmit(event) {
        event.preventDefault();
    }

    render () {
        return (
            <div className="converter">
                <form onSubmit={this.onSubmit}>
                    Currency convertor EUR to USD
                    <br/>
                    EUR:
                    <input 
                        onChange={this.onChange} 
                        type="number" 
                        name="eur" 
                        value={this.state.eur}/>
                    <br />
                        TO
                    <br />
                    USD:
                    <input 
                        type="number" 
                        name="usd" 
                        onChange={this.onChange}
                        value={this.state.usd} />
                </form>
            </div>
        )
    }
}