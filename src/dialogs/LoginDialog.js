import React from "react";
import BaseDialog from "./BaseDialog";
import "./styles/LoginDialog.css"

class LoginDialog extends React.Component {
 
    constructor(props) {
        super(props);

        this.state = {
            login: '',
            password: ''
        }

        this.clickHandler = this.clickHandler.bind(this);
        this.loginChangeHandler = this.loginChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    }

    clickHandler (buttonLoginClicked) {

        let isLoginOk = false;

        if (buttonLoginClicked) {

            // TODO : Maybe, do some request to check the login.
            isLoginOk = true;
            
        }

        this.props.onLoginChanged({
             isLoginOk: isLoginOk,
             login: this.state.login
        });
    }  

    loginChangeHandler (event) {
        this.setState({login: event.target.value});
    }

    passwordChangeHandler (event) {
        this.setState({password: event.target.value});
    }

    render() {

        const bodyPart = (
            <div className="login-dialog-body">
                {/* <div className='logindialog-icon-head'>
                    <img src='logo512.png' alt='Alien Space Invader' width='64' height='64'/>
                </div>                 */}
                <div className="login-dialog-input">
                    <label htmlFor='login' className='logindialog-label'>Login:</label>
                    <input className='logindialog-input-textbox' id='login' type='text' onChange={this.loginChangeHandler}></input>
                </div>
                <div className='login-dialog-input'>
                    <label htmlFor='password' className='logindialog-label'>Password:</label>
                    <input className='logindialog-input-textbox' id='password' type='password' onChange={this.passwordChangeHandler}></input>
                </div>
                <div className='login-dialog-button-section'>
                    <button className='login-dialog-button' onClick={this.clickHandler.bind(this, true)}>
                        Login
                    </button>
                    <button className='login-dialog-button' onClick={this.clickHandler.bind(this, false)}>
                        Cancel
                    </button>
                </div>
            </div>
        );

        return (
             <BaseDialog title='Sign in' body={bodyPart} />            
        );    
    }

}

export default LoginDialog;