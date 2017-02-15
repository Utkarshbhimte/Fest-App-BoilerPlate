/**
 * Created by utkarsh on 15/02/17.
 */
import React, {Component} from 'react';

class EventCard extends Component {
    render() {
        const event = this.props.event;
        const day = this.props.index.slice(0,2);

        return(
            <div className="card">
                <div className="basic" onClick={() => this.props.toggleRegistration(this.props.index)}>
                    <div className="day-wrap">
                        <span>DAY</span>
                        <h3>{day}</h3>
                    </div>
                    <fav className={ event.registered ? 'active' : '' }
                         aria-confirmed={ event.regis_confirmed && event.registered }> </fav>
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
                        {/*<a>Register</a>*/}
                    </div>
                </div>
            </div>
        )
    }
}

EventCard.propTypes = {};
EventCard.defaultProps = {};

export default EventCard;
