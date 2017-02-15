import React, {Component} from 'react';
import { Link } from 'react-router';
import Header from './header'
import EventCard from './EventCard'
import allEvents from '../sample-events.js'

class App extends Component {
    constructor(){
        super();
        this.state = {
            events: null,           // Object of all arrays
            registeredEvents: {},   // State of Confirmation of Registration
            profile: null,          // User's Profile
            activeTab: 1            // Tab Status
        };
        this.renderEventCards = this.renderEventCards.bind(this);
        this.onTabClick = this.onTabClick.bind(this);
        this.toggleRegistration = this.toggleRegistration.bind(this);
    }

    // Importing all the Events
    componentWillMount(){
        this.setState({
            events: allEvents
        });
    }

    // Rendering the EventCard
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

    // Filtering the Events acc to the Tabs
    onTabClick = (state) => {
        console.log('changed state to',state);
        this.setState({
            activeTab : parseInt(state)
        })
    };

    filterCards = (key) => {
        const event = this.state.events[key];
        const day = key.slice(0,2);

        if(this.state.activeTab === 1){
            return (day === '01');
        }else if(this.state.activeTab === 2){
            return (day === '02');
        }else if(this.state.activeTab === 0){
            return ( event.registered );
        }
    };

    // Add or remove from RegisteredEvents
    toggleRegistration = (key) => {
        let registeredEvents = {...this.state.registeredEvents};
        let events = {...this.state.events};

        if(registeredEvents.hasOwnProperty(key) && !(events[key].regis_confirmed)){
            delete registeredEvents[key];
            events[key].registered = false;
        }else{
            events[key].registered = true;
            registeredEvents[key] = false;
        }

        this.setState({events, registeredEvents})
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
                            <EventCard key={key} index={key} toggleRegistration={this.toggleRegistration}
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
