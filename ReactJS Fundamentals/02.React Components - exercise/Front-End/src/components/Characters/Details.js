import React from 'react';

export default class Details extends React.Component {
 
    render = () => (
        <section id="bio">      
            <img className="image" src={this.props.url} alt="pi"/>           
            <div className="info">
                <p>Name: <strong>{this.props.name}</strong></p>
                <p>Bio: {this.props.bio}</p>
                <p></p>
            </div>
        </section>
    )
}