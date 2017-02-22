import React, { Component } from 'react';

class Login extends Component {
    render() {        
        return (
            <div className="text-center div-login box-material">
                <p>Hi, welcome to the React Personal Finance Manager.</p>
                <p>Please, login with your Google or Github account to continue</p>
                <button className="button button-github" onClick={() => {this.props.onGithubLogin()}}><i className="fa fa-github" aria-hidden="true"></i> Login with Github</button>
                <button className="button button-google" onClick={() => {this.props.onGoogleLogin()}}><i className="fa fa-google" aria-hidden="true"></i> Login with Google</button>
            </div>
        );
    }
}

export default Login;