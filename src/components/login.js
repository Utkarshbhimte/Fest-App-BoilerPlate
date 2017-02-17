import React, {Component} from 'react';
import base from '../base';

class Login extends Component {
    constructor(){
        super();

        this.state = {
            user: null
        }

        this.authenticate = this.authenticate.bind(this);
        this.authHandler = this.authHandler.bind(this);
        this.checkUser = this.checkUser.bind(this);
    }

    authenticate(){
        base.authWithOAuthPopup('google', this.authHandler);
    }

    authHandler(err, authData){
        // The User Object
        const user  = authData.user.providerData[0];

        // Updating the state
        this.setState({user});

        //Saving to LocalStorage
        localStorage.setItem(`user`,JSON.stringify(this.state.user));

        // Redirect to Homepage
        this.context.router.transitionTo('/');
    }

    checkUser(){
        // Checking if there is user data in BrowserCache
        let LocalStorageUserRef = localStorage.getItem('user');

        // If true then redirect them to the Homepage
        if(LocalStorageUserRef){
            this.context.router.transitionTo('/');
        }
    }

    componentDidMount(){
        this.checkUser();
    }

    static contextTypes = {
        router: React.PropTypes.object
    }

    render() {
        // this.checkUser()
        return(
            <div className="login-wrap">
                <button onClick={() => {this.authenticate()} }>Sign in</button>
            </div>
        )
    }
}

Login.contextTypes = {
    router: React.PropTypes.object
}

export default Login;
