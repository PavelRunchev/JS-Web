import React, { Component } from 'react';

export default class Form extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            password: '',
            bio: '',
            select: ''
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit(event) {
        //not refresh page
        event.preventDefault();
        //validation logic...
        console.log(this.state.name);
        console.log(this.state.password);
        console.log(this.state.bio);
        console.log(this.state.select);
        console.log(this.state.value);
        //send to back-end
        //fetch(ip....);
    }

    onChange (event) {
        this.setState({[event.target.name]: event.target.value});
    }

    render () {
        return (
            <form onSubmit={this.onSubmit}>
                Name:   
                <input
                    onChange={this.onChange}     
                    type="text"
                    name="name" 
                    value={this.state.name} />
                <br />
                Password: 
                <input  
                    onChange={this.onChange}   
                    type="password"
                    name="password" 
                    value={this.state.password} />
                <br />
                Textarea: 
                <textarea
                    onChange={this.onChange}
                    name="bio"
                    value={this.state.bio} />
                <input type="submit" value="Submit" />
                <select  
                    onChange={this.onChange} 
                    name="select"
                    value={this.state.select} >
                    <option value="Volvo">Volvo</option>
                    <option value="Audi">Audi</option>
                    <option value="Fiat">Fiat</option>
                    <option value="Opel">Opel</option>
                </select>
            </form>
        )
    }
}