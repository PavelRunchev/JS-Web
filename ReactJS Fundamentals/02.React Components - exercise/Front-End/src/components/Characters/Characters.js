import React from 'react';

import Roster from './Roster';
import Details from './Details';
import fetcher from '../../fetcher';

const ROSTER_ENPOINT = '/roster';
const DETAILS_ENDPOINT = '/character/';

export default class Characters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            details: {
                name: 'Rick',
                id: 0,
                url: 'https://avatarfiles.alphacoders.com/889/88985.png',
                bio: "Rick Sanchez is the co-eponymous main character and leading protagonist of the show. He is a genius scientist whose alcoholism and reckless, nihilistic behavior are a source of concern for his daughter's family, as well as the safety of their son, Morty. He is voiced by Justin Roiland."
            }
        }
    }

    componentDidMount = () => this.fetchRoster();

    mapImages(data) {
        return {
            images: data.map(i => {
                return {
                    id: i.id,
                    url: i.url
                }
            })
        }
    }

    fetchRoster = () => 
        fetcher.get(ROSTER_ENPOINT, data => this.setState(this.mapImages(data)));

    fetchDetails = id =>
        fetcher.get(DETAILS_ENDPOINT + id, data => this.setState({ details: data }));

    selectCharacter = id => 
        this.fetchDetails(id);
        
    render = () => (
            <div>
                <Roster images={this.state.images} select={this.selectCharacter} />
                <Details {...this.state.details} />
            </div>
            
        )  
}
