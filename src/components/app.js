import React, {Component} from 'react';
import { Link } from 'react-router';
import $ from 'jquery'
import qrcode from 'qrcode-js'
import Header from './header'
import EventCard from './EventCard'
import allEvents from '../sample-events'
import Modal from 'react-modal';

class App extends Component {
    constructor(){
        super();
        this.state = {
            events: null,           // Object of all arrays
            registeredEvents: {},   // State of Confirmation of Registration
            profile: {
                displayName:"Utkarsh Bhimte",
                email:"utkarshbhimte95@gmail.com",
                contact: "9108908806",
                photoURL:"https://lh6.googleusercontent.com/-z-Cc3sZILsA/AAAAAAAAAAI/AAAAAAAACnI/e9MZYxgdHOU/photo.jpg",
                uid:"110148726058872940500"
            },                      // User's Profile
            activeTab: 1,           // Tab Status
            modalIsOpen: false,     // Modal State
            adminModalIsOpen: false,     // Modal State
            payingForQR: null,       // CurrentPayment
            payingFor: false        // CurrentPayment
        };
        this.renderEventCards = this.renderEventCards.bind(this);
        this.onTabClick = this.onTabClick.bind(this);
        this.toggleRegistration = this.toggleRegistration.bind(this);
        this.payForEvent = this.payForEvent.bind(this);
        this.openModal = this.openModal.bind(this);
        this.openAdminModal = this.openAdminModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.afterOpenAdminModal = this.afterOpenAdminModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.getAdminAccess = this.getAdminAccess.bind(this)

    }

    // Importing all the Events
    componentWillMount(){
        this.setState({
            events: allEvents
        });
    }

    getAdminAccess = () => {
        return true;
    }

    // Rendering the EventCard
    renderEventCards(key){
        const event = this.state.events[key];
        const day = key.slice(0,2);
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

    payForEvent = () => {
        console.log('pay');
    };



    // For the modal
    openModal(payingFor) {
        this.setState({modalIsOpen: true, payingFor});

        let qrData = {};
        qrData['name'] = this.state.profile.displayName;
        qrData['uid'] = this.state.profile.uid;
        qrData['event'] = payingFor;
        // qrData = JSON.parse(qrData);
        console.log(JSON.stringify(qrData));
        const payingForQR = qrcode.toDataURL(JSON.stringify(qrData), 4);

        this.setState({ payingForQR });
        console.log(payingForQR);
    }

    openAdminModal() {
        this.setState({adminModalIsOpen: true});

    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        // this.refs.subtitle.style.color = '#f00';
    }
    afterOpenAdminModal() {
        $('#reader').html5_qrcode(function(data){
            // do something when code is read
        },
        function(error){
            //show read errors
        }, function(videoError){
            //the video stream could be opened
        }
    )}

    closeModal() {
        this.setState({modalIsOpen: false, adminModalIsOpen: false});
    }

    renderModal = () => {
        return(<div className="modal-wrap">
                    <div className="part-1">
                        <h3>Show this code</h3>
                        <img src={this.state.payingForQR} alt="QR Code"/>
                    </div>
                    <hr/>
                    <span>OR</span>
                    <div className="part-2">
                        <h3>Show your User ID</h3>
                        <h1>{this.state.profile.uid.replace(/(\d{5})(\d{5})(\d{5})(\d{6})/, "$1-$2-$3-$4")}</h1>
                    </div>
                </div>
            )};

    renderAdminModal = () => {
        console.log('admin')
        return(<div className="admin modal-wrap">
                    <div className="part-1">
                        <h3>Capture QR code</h3>
                        <div id="reader"></div>
                    </div>
                    <hr/>
                    <span>OR</span>
                    <div className="part-2">
                        <input type="number" pattern='[(\d{5})(\d{5})(\d{5})(\d{6})]' placeholder="write the code here"/>
                    </div>
                </div>
            )};

    render(){
        const customStyles = {
            content : {
                top                   : '50%',
                left                  : '50%',
                right                 : 'auto',
                bottom                : 'auto',
                textAlign             : 'center',
                marginRight           : '-50%',
                transform             : 'translate(-50%, -50%)',
                height                : 'auto',
                width                 : '90vw',
                borderRadius          : '0px',
                padding               : '0',
                border                : 'none'
            },
            overlay: {
                backgroundColor        : 'rgba(0,0,0, 0.74902)'
            }
        };
        return (
            <div className='contain-all'>
                <Header onTabClick={this.onTabClick}
                        activeTab={this.state.activeTab}/>
                <div className="card-wrap">
                    {Object.keys(this.state.events)
                        .filter((key) =>this.filterCards(key))
                        .map( (key) =>
                            <EventCard key={key} index={key} toggleRegistration={this.toggleRegistration}
                                       event={this.state.events[key]}
                                       openModal={this.openModal}
                                       openAdminModal={this.openAdminModal}/>
                        )}
                </div>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    style={customStyles}
                    onRequestClose={this.closeModal}
                    contentLabel="Checkout Modal"
                >
                    {this.renderModal()}
                </Modal>
                <Modal
                    isOpen={this.state.adminModalIsOpen}
                    onAfterOpen={this.afterOpenAdminModal}
                    style={customStyles}
                    onRequestClose={this.closeModal}
                    contentLabel="Admin Modal"
                >
                    {this.renderAdminModal()}
                </Modal>
            </div>
        );
    }
}

App.contextTypes = {
    router: React.PropTypes.object
};

export default App;
