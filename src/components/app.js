import React, {Component} from 'react';
import { Link } from 'react-router';
import Header from './header'
import EventCard from './EventCard'
import allEvents from '../sample-events.js'

class App extends Component {
    constructor(){
        super();
        this.state = {
            events: null,
            favEvents: false,
            profile: null,
            activeTab: 1
        };
        this.renderEventCards = this.renderEventCards.bind(this);
        this.onTabClick = this.onTabClick.bind(this);
        this.toggleFav = this.toggleFav.bind(this);
    }

    componentWillMount(){
        this.setState({
            events: allEvents
        });
    }

    renderEventCards(key){
        const event = this.state.events[key];
        const day = key.slice(0,2);
        console.log(event);

        console.log('one');
        return(
            <div className="card" key={key}>
                <div className="main">
                    <h2>{event.name}</h2>
                    <p>{event.desc}</p>
                    <div className="details">
                        <span className="location">{event.location}</span>
                        <span className="s_time">{event.time}</span>
                        <span className="contact">{event.contact}</span>
                    </div>
                </div>
                <div className="more"></div>
            </div>
        )
    }

    onTabClick = (state) => {
        console.log('changed state to',state);
        this.setState({
            activeTab : parseInt(state)
        })
    };

    filterCards = (key) => {
        const event = this.state.events[key];
        const day = key.slice(0,2);
        // console.log(day, event);

        if(this.state.activeTab === 1 && day === '01'){
            console.log('one');
            return (this.state.activeTab === 1 && day === '01');

        }else if(this.state.activeTab === 2 && day === '02'){
            console.log('two');
            return (this.state.activeTab === 2 && day === '02');
        }else if(this.state.activeTab === 0){
            console.log('fav');
            return (this.state.activeTab === 0 && event.fav );
        }
    };

    toggleFav = (key) => {
        const event = this.state.events[key];
        let events = {...this.state.events};
        // if(events[key].fav){
        events[key].fav = !events[key].fav;
        // }else if(!events[key].fav){
        //     events[key].fav = true;
        // }
        this.setState({events})
    };

    render(){
        return (
            <div className='contain-all'>
                <Header onTabClick={this.onTabClick}
                        activeTab={this.state.activeTab}/>
                <div className="card-wrap">
                    {Object.keys(this.state.events)
                        .filter((key) =>this.filterCards(key))
                        .map( (key) =>
                            <EventCard key={key} index={key} toggleFav={this.toggleFav}
                                       event={this.state.events[key]}/>
                        )}
                </div>
            </div>
        );
    }
}

App.contextTypes = {
    router: React.PropTypes.object
};

export default App;
