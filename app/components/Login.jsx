import React, { Component } from 'react';

class Login extends Component {
    render() {
        var renderLogin = () => {
            if (firebase.auth().currentUser) {
                return (<p>Welcome to the Finance App <button className="button" onClick={() => {this.props.onLogout()}}>Logout</button></p>)
                         
            } else {
                return (
                    <div>
                        <button className="button" onClick={() => {this.props.onGithubLogin()}}>Login with Github</button>
                        <button className="button" onClick={() => {this.props.onGoogleLogin()}}>Login with Google</button>
                    </div>
                )       
            }
        }

        return (
            <div>
                {renderLogin()}
            </div>
        );
    }
}

export default Login;