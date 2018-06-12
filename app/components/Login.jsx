import React, { Component } from "react";

class Login extends Component {
    render() {
        return (
            <div className="text-center div-login box-material">
                <p>Hi, welcome to the React Personal Finance Manager.</p>
                <p>
                    Please, login with your Google or Github account to continue
                </p>
                <button
                    className="button button-github"
                    onClick={() => {
                        this.props.onGithubLogin();
                    }}
                >
                    <i className="fa fa-github" aria-hidden="true" />
                    {" "}
                    Login with Github
                </button>
                <button
                    className="button button-google"
                    onClick={() => {
                        this.props.onGoogleLogin();
                    }}
                >
                    <i className="fa fa-google" aria-hidden="true" />
                    {" "}
                    Login with Google
                </button> <br />
                <button
                    className="button button-mail"
                    onClick={() => {
                        this.props.onEmailLogin();
                    }}
                >
                    <i className="fa fa-envelope" aria-hidden="true" />
                    {" "}
                    Login with E-Mail
                </button>
                <button
                    className="button button-phone"
                    onClick={() => {
                        this.props.onPhoneLogin();
                    }}
                >
                    <i className="fa fa-phone" aria-hidden="true" />
                    {" "}
                    Login with Phone
                </button> <br />
                <button
                    className="button button-twitter"
                    onClick={() => {
                        this.props.onTwitterLogin();
                    }}
                >
                    <i className="fa fa-twitter" aria-hidden="true" />
                    {" "}
                    Login with Twitter
                </button>
                <button
                    className="button button-facebook"
                    onClick={() => {
                        this.props.onFacebookLogin();
                    }}
                >
                    <i className="fa fa-facebook-f" aria-hidden="true" />
                    {" "}
                    Login with Facebook
                </button>
            </div>
        );
    }
}

export default Login;
