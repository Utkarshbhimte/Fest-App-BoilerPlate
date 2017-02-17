import React, {Component} from 'react'
import { Link } from 'react-router'
import $ from 'jquery'
import qrcode from 'qrcode-js'
import Header from './header'
import EventCard from './EventCard'
import allEvents from '../sample-events'
import Modal from 'react-modal'
import QRReader from '../qrscan'
import base from '../base'


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
            admin_finalMessage: '',
            admin_buyer: null,
            admin_allCollection: {}
        };
        this.onTabClick = this.onTabClick.bind(this);
        // this.toggleRegistration = this.toggleRegistration.bind(this);
        this.openModal = this.openModal.bind(this);
        this.openAdminModal = this.openAdminModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.afterOpenAdminModal = this.afterOpenAdminModal.bind(this);
        this.getAdminAccess = this.getAdminAccess.bind(this);
        this.startScan = this.startScan.bind(this);
        this.getDataFromQR = this.getDataFromQR.bind(this);
        this.getDataFromInput = this.getDataFromInput.bind(this);
        this.checkConfirmation = this.checkConfirmation.bind(this)
        this.logout = this.logout.bind(this)
    }

    // Importing all the Events
    componentWillMount(){
        const localStorageUser = localStorage.getItem(`user`);
        const localStorageCollection = localStorage.getItem(`admin_allCollection`);

        if(localStorageUser) {
            let profile = JSON.parse(localStorageUser);
            let admin_allCollection = JSON.parse(localStorageCollection);

            profile['registeredEvents'] = profile['registeredEvents'] ? profile['registeredEvents'] : {};
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
    }

    componentWillUnmount(){
        base.removeBinding(this.firebaseUserRef);
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
        }else if(this.state.activeTab === 0){
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
        const data = this.state.profile.uid+this.state.payingFor;
        return(
            <div className="modal-wrap">
                <div className="part-1">
                    <h3>Show this code</h3>
                    <img src={this.state.payingForQR} alt="QR Code"/>
                </div>
                <hr/>
                <span>OR</span>
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
                        <span>{this.state.admin_finalMessage}</span>
                        <input id="code-submit" type="submit" value="confirm"/>
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

    // confirmTransaction = (uid, event) => {
    //     // let admin_allCollection = {...this.state.admin_allCollection};
    //     let admin_buyer = {...this.state.admin_buyer};
    //
    //     // admin_allCollection[event] = admin_allCollection[event] ? admin_allCollection[event] : [];
    //     admin_buyer['registeredEvents'] = admin_buyer['registeredEvents'] ? admin_buyer['registeredEvents'] : [];
    //
    //     this.firebaseBuyerRef = base.syncState(`users/${uid}/`, {
    //         context: this,
    //         state: 'admin_buyer'
    //     });
    //
    //
    //     if(!checkConfirmation(event, uid)){
    //         admin_buyer['registeredEvents'][event] = true;
    //
    //         admin_allCollection[event].push(uid);
    //
    //         this.setState({admin_finalMessage: 'Registration Successful', admin_allCollection, admin_buyer});
    //         localStorage.setItem('admin_allCollection', JSON.stringify(admin_allCollection))
    //
    //     }else{
    //         this.setState({admin_finalMessage: 'User Already Registered'})
    //     }
    //     base.removeBinding(this.firebaseBuyerRef);
    // };

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
            this.setState({admin_finalMessage: 'Registration Successful', admin_buyer, events});
        }else{
            this.setState({admin_finalMessage: 'User Already Registered'})
        }
        base.removeBinding(this.firebaseBuyerRef);
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

    closeModal() {
        this.setState({modalIsOpen: false, adminModalIsOpen: false});
    }

    // renderReturn
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
                        activeTab={this.state.activeTab}
                        logout={this.logout} />
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
                </div>
                <Modal
                    isOpen={this.state.modalIsOpen}
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
