import React, {Component} from 'react'
import { Link } from 'react-router'
import $ from 'jquery'
import qrcode from 'qrcode-js'
import Header from './header'
import EventCard from './EventCard'
import {allEvents} from '../sample-events'
import Modal from 'react-modal'
import QRReader from '../qrscan'
import moment from 'moment'
import base from '../base'
import NotificationsWrap from './notifications-wrap'
import ModalMessage from './modal-message'


class App extends Component {
    constructor(){
        super();
        this.state = {
            events: null,                // Object of all arrays
            registeredEvents: [''],      // State of Confirmation of Registration
            profile: {},                 // User's Profile
            activeTab: 1,                // Tab Status
            modalIsOpen: false,          // Modal State
            adminModalIsOpen: false,     // Modal State
            payingForQR: null,           // CurrentPayment
            payingFor: false,            // CurrentPayment
            admin_getInfo: 'No Result',
            admin_buyer: null,
            admin_registrationResponse: {
                type: null,
                msg: 'User already Exist'
            },
            admin_allCollection: {}
        };
        this.onTabClick = this.onTabClick.bind(this);
        this.openModal = this.openModal.bind(this);
        this.openAdminModal = this.openAdminModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.afterOpenAdminModal = this.afterOpenAdminModal.bind(this);
        this.getAdminAccess = this.getAdminAccess.bind(this);
        this.startScan = this.startScan.bind(this);
        this.getDataFromQR = this.getDataFromQR.bind(this);
        this.getDataFromInput = this.getDataFromInput.bind(this);
        this.checkConfirmation = this.checkConfirmation.bind(this)
        this.logout = this.logout.bind(this);
        this.triggerAdminModalNotification = this.triggerAdminModalNotification.bind(this);

    }

    // Importing all the Events
    componentWillMount(){
        const localStorageUser = localStorage.getItem(`user`);
        const localStorageCollection = localStorage.getItem(`admin_allCollection`);

        if(localStorageUser) {
            let profile = JSON.parse(localStorageUser);
            let admin_allCollection = JSON.parse(localStorageCollection);

            profile['registeredEvents'] = profile['registeredEvents'] ? profile['registeredEvents'] : [''];
            this.firebaseUserRef = base.syncState(`users/${profile.uid}/`, {
                context: this,
                state: 'profile'
            });
            this.setState({ profile, events: allEvents, admin_allCollection});
        }else{
            this.context.router.transitionTo('/login');
        }


        if(this.getAdminAccess){
            this.firebaseEventsRef = base.syncState(`events/`, {
                context: this,
                state: 'events'
            });
        }

        // When you want to force push the sample Events to the server
        // this.setState({ events: allEvents});

    }

    componentWillUnmount(){
        if(this.state.profile){
            base.removeBinding(this.firebaseUserRef);
        }
        if(this.getAdminAccess){
            base.removeBinding(this.firebaseEventsRef);
        }
    }

    logout = () => {
        console.log('loging out..')
        base.unauth();
        this.setState({ profile: null });
        localStorage.setItem(`user`,'');
        this.context.router.transitionTo('/login');
    };

    checkConfirmation = (key, uid) => {
        return this.state.events[key].participants.indexOf(uid) !== -1
    };

    getAdminAccess = () => {
        return true;
    };

    // Filtering the Events acc to the Tabs
    onTabClick = (state) => {
        this.setState({
            activeTab : parseInt(state)
        })
    };

    // Filtering the cards according to the Tab
    filterCards = (key) => {
        const event = this.state.events[key];
        const day = key.slice(0,2);

        if(this.state.activeTab === 1){
            return (day === '01');
        }else if(this.state.activeTab === 2){
            return (day === '02');
        }else if(this.state.activeTab === 0 && this.state.profile.registeredEvents){
            return ( this.state.profile.registeredEvents.indexOf(key) !== -1 );
        }
    };

    // RENDER MODALS
    // Opening the modal and Geenrating the data for QR Code
    openModal(payingFor) {
        this.setState({modalIsOpen: true, payingFor});

        let qrData = {};
        qrData['name'] = this.state.profile.displayName;
        qrData['uid'] = this.state.profile.uid;
        qrData['event'] = payingFor;
        const payingForQR = qrcode.toDataURL(JSON.stringify(qrData), 4);
        this.setState({ payingForQR });
    }

    // Modal for 'Pay-and-Register'
    renderModal = () => {
        const data = this.state.profile.uid ? this.state.profile.uid+this.state.payingFor : '';

        return(
            <div className="modal-wrap">
                { this.state.admin_registrationResponse.type !== null &&
                <ModalMessage message={this.state.admin_registrationResponse.msg}
                              msgType={this.state.admin_registrationResponse.type} />
                }
                <div className="part-1">
                    <h3>Show this code</h3>
                    <img src={this.state.payingForQR} alt="QR Code"/>
                </div>
                <hr/>
                <span className="or">OR</span>
                <div className="part-2">
                    <h3>Show your User ID</h3>
                    <h1>{data.replace(/(\d{5})(\d{5})(\d{5})(\d{5})(\d{5})/, "$1-$2-$3-$4-$5")}</h1>
                </div>
            </div>
        )};

    // Modal for Organiser
    renderAdminModal = () => {
        // TODO: shorten this 25 digit code
        return(
        <div className="admin modal-wrap">
                <div className="part-1">
                    <h3>Capture QR code</h3>
                    <video autoPlay onClick={() => this.scan()}></video>
                </div>
                <hr/>
                <span className="or">OR</span>
                <div className="part-2">
                    <form onSubmit={(e) => this.getDataFromInput(e)}>
                        <input id="code-input" type="number" maxLength={25}
                               placeholder="write the code here"
                               defaultValue={this.state.profile.uid+`0101`}
                               ref={(input) => this.regCode = input}/>

                        { this.state.admin_registrationResponse.type !== null &&
                            <ModalMessage message={this.state.admin_registrationResponse.msg}
                                          msgType={this.state.admin_registrationResponse.type} />
                        }
                        { !this.state.admin_registrationResponse.type &&
                            <input id="code-submit" type="submit" value="confirm"/>
                        }
                    </form>
                </div>
            </div>
        )
    };

    // The scan in process
    startScan = () => {
        QRReader.scan((result) => {
            console.log('catched', JSON.parse(result));
            this.getDataFromQR(result);
        });
    };

    // admin_allCollection
    getDataFromQR = (result) => {
        const {name, uid, event} = JSON.parse(result);
        this.confirmTransaction(uid, event)
    };

    getDataFromInput = (e) => {
        e.preventDefault();
        const inputVal = this.regCode.value;
        const uid = inputVal.slice(0,21);
        const event = inputVal.slice(21, 25);
        this.confirmTransaction(uid, event)
    };

    confirmTransaction = (uid, event) => {
        this.firebaseBuyerRef = base.syncState(`users/${uid}/`, {
            context: this,
            state: 'admin_buyer'
        });

        let admin_buyer = {...this.state.admin_buyer};
        let events = {...this.state.events};
        let eventParticipants = events[event].participants;
        admin_buyer['registeredEvents'] = admin_buyer['registeredEvents'] ? admin_buyer['registeredEvents'] : [];
        eventParticipants = eventParticipants ? eventParticipants : [];


        if(!this.checkConfirmation(event, uid)){
            admin_buyer['registeredEvents'].push(event);
            eventParticipants.push(uid);
            this.triggerAdminModalNotification('Registration Successful', true);
            this.setState({admin_buyer, events});
        }else{
            this.triggerAdminModalNotification('User Already Exist', false);
        }
        base.removeBinding(this.firebaseBuyerRef);
    };

    // To set the text nad type of the modal message and also to set null after
    triggerAdminModalNotification = (msg, type) => {
        let admin_registrationResponse = {...this.state.admin_registrationResponse}
        admin_registrationResponse['msg'] = msg;
        admin_registrationResponse['type'] = type;
        this.setState({admin_registrationResponse});
        console.log('triggerAdminModalNotification on ', moment().format());

        setTimeout(function(){
            console.log('setting null on ', moment().format());
            admin_registrationResponse['type'] = null;
            this.setState({admin_registrationResponse})
        }.bind(this),3000)
    };

    // Initiating the Admin Modal
    openAdminModal() {
        this.setState({adminModalIsOpen: true});
    }

    // Initiating the scan
    afterOpenAdminModal() {
        QRReader.init();
        this.startScan();

        let $input = $('.part-2 #code-input');

        $input.keyup(function () {
            const $this = $(this);
            if ($this.val().length >= 25) {
                $this.val($this.val().substr(0, 25)).blur();
            }
        });
    }

    // Initiating the scan
    afterOpenModal() {
        if(this.state.profile.registeredEvents && (this.state.profile.registeredEvents.indexOf(this.props.payingFor) !== -1)){
            $('.modal-wrap .success').addClass('active').delay(10000).queue(function(){
                        $(this).removeClass('active');
                });
        }
    }

    closeModal() {
        this.setState({modalIsOpen: false, adminModalIsOpen: false});
    }

    // renderReturn
    render(){
        const customStyles = {
            content : {
                top                   : '20%',
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
                border                : 'none',
                transition            : 'all .3s ease-in-out',
                opacity               : '0',
            },
            overlay: {
                transition            : 'all .3s ease-in-out',
                opacity               : '0',
                backgroundColor        : 'rgba(0,0,0, 0.74902)'
            }
        };
        return (
            <div className='contain-all'>
                <Header onTabClick={this.onTabClick}
                        activeTab={this.state.activeTab}
                        logout={this.logout} />
                { this.state.activeTab < 3 &&
                    <div>
                        <div className="card-wrap">
                            { this.state.events &&
                            Object.keys(this.state.events)
                                .filter((key) =>this.filterCards(key))
                                .map( (key) =>
                                    <EventCard key={key} index={key} event={this.state.events[key]}
                                               confirmed={this.checkConfirmation(key, this.state.profile.uid)}
                                               openModal={this.openModal}
                                               openAdminModal={this.openAdminModal}/>
                                )}
                            { this.getAdminAccess &&
                                <a className="FAB" onClick={ () => {this.openAdminModal()}}>P</a>
                            }
                        </div>
                        <Modal
                            isOpen={this.state.modalIsOpen}
                            style={customStyles}
                            onAfterOpen={this.afterOpenModal(this.state.profile.registeredEvents)}
                            onRequestClose={this.closeModal}
                            contentLabel={"Checkout Modal"}
                            closeTimeoutMS={300}
                            registeredEvents={this.state.profile.registeredEvents}
                            payingFor={this.state.payingFor}
                        >
                            {this.renderModal()}
                        </Modal>
                        <Modal
                            isOpen={this.state.adminModalIsOpen}
                            onAfterOpen={this.afterOpenAdminModal}
                            style={customStyles}
                            closeTimeoutMS={300}
                            onRequestClose={this.closeModal}
                            contentLabel="Admin Modal"
                        >
                            {this.renderAdminModal()}
                        </Modal>
                    </div>
                }
                { this.state.activeTab === 3 &&
                    <NotificationsWrap admin={this.getAdminAccess()} />
                }
            </div>
        );
    }
}

App.contextTypes = {
    router: React.PropTypes.object
};

export default App;
