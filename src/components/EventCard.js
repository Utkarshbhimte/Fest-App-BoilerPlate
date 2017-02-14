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
                <div className="basic">
                    <div className="day-wrap">
                        <span>DAY</span>
                        <h3>{day}</h3>
                    </div>
                    <fav onClick={() => this.props.toggleFav(this.props.index)}
                         className={ event.fav ? 'active' : ''}
                    > </fav>
                    <div className="details">
                        <span className="location">{event.location}</span>
                        {/*<span className="contact">{event.contact}</span>*/}
                    </div>
                </div>
                <div className="main">
                    <h2>{event.name}</h2>
                    <span className="s_time">{event.time}</span>
                    <p>{event.desc}</p>
                </div>
                <div className="more"></div>
            </div>
        )
    }
}

EventCard.propTypes = {};
EventCard.defaultProps = {};

export default EventCard;
