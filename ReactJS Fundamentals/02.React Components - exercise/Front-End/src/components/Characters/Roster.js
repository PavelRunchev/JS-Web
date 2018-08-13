import React from 'react';

export default class Roster extends React.Component {  

        render = () => {          
            const images = this.props.images.map(i => (                
                <img src={i.url} alt="pic" onClick={() => this.props.select(i.id)} />             
            ));
            
            return ( 
                <section id="roster">
                    {images}
                </section>
            )
        }
}
