import React, {Component} from 'react';

class EventCard extends Component {
    constructor(){
        super();
        this.getAdminAccess = this.getAdminAccess.bind(this)

    }
    getAdminAccess = () => {
        return true;
    }
    render() {
        const event = this.props.event;
        const day = this.props.index.slice(0,2);
        return(
            <div className="card">
                <div className="basic">
                    <div className="day-wrap">
                        <span>DAY</span>
                        <h3>{day}</h3>
                    </div>
                    <fav aria-confirmed={ this.props.confirmed }>
                    </fav>
                    <div className="details">
                        <span className="location">{event.location}</span>
                        {/*<span className="contact">{event.contact}</span>*/}
                    </div>
                </div>
                <div className="main">
                    <h2>{event.name}</h2>
                    <span className="s_time">{event.time}</span>
                    <div className="more active">
                        <ul>
                            {event.desc.split('.').map( function(point, k) {
                                return(
                                    <li key={k}>{point}</li>
                                )
                            })}
                        </ul>
                    </div>
                    <div className="btn-wrap">
                        <a>Contact</a>
                        { !this.props.confirmed && this.getAdminAccess &&
                            <a onClick={ () => {this.props.openModal(this.props.index)}}>Register and Pay</a>
                        }
                        { this.getAdminAccess &&
                            <a onClick={ () => {this.props.openAdminModal()} }> Recieve Payment</a>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

EventCard.propTypes = {};
EventCard.defaultProps = {};

export default EventCard;
