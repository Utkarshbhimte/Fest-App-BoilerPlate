/**
 * Created by utkarsh on 18/02/17.
 */
import React, {Component} from 'react'
import base from '../base'
import moment from 'moment'
import {sampleNotifications} from '../sample-events'


class NotificationsWrap extends Component {
    constructor(){
        super();

        this.state = {
            notifications: sampleNotifications
        };
        this.findTimeDiff = this.findTimeDiff.bind(this);
        this.sendNotification = this.sendNotification.bind(this);
    }

    componentWillMount(){
        const localNotifications = localStorage.getItem(`notifications`);


        this.firebaseNotification = base.syncState(`notifications/`, {
            context: this,
            state: 'notifications'
        });

        let notifications = sampleNotifications;

        if(localNotifications) {
            notifications = JSON.parse(localNotifications);
        }
            this.setState({notifications});
    }

    componentWillUnmount(){
        base.removeBinding(this.firebaseNotification);
    }

    sendNotification = (e) => {
        e.preventDefault();
        const notifications = {...this.state.notifications};
        const timestamp = moment().valueOf().toString().slice(0, 10);
        notifications[timestamp] = {sender: 'AwesomeFest17',caption: this.notiValue.value};
        this.setState({notifications});
        this.notifyForm.reset();
    }

    findTimeDiff= (timestamp) =>{
        return moment.unix(timestamp).fromNow();
    };

    render()
    {
        return (
            <div className="notification-wrapper">
                {this.props.admin &&
                <form onSubmit={(e) => this.sendNotification(e)}
                      ref={(input) => this.notifyForm = input}>
                    <input type="text" ref={(input) => this.notiValue = input} required/>

                    <input type="submit" value='Next'/>
                </form>
                }
                {Object.keys(this.state.notifications).reverse()
                    .map( (timestamp) =>
                        {
                            const caption = this.state.notifications[timestamp].caption;
                            const sender = this.state.notifications[timestamp].sender;
                            return (<div className="notification" key={timestamp}>
                                <h4>{caption}</h4>
                                <span className="sender">{sender}</span>
                                <span className="timestamp">{this.findTimeDiff(timestamp)}</span>
                            </div>)
                        }
                    )}
            </div>
        );
    }
}

NotificationsWrap.propTypes = {};
NotificationsWrap.defaultProps = {};

export default NotificationsWrap;
