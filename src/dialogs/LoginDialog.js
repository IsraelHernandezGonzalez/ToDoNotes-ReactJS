import React from "react";
import BaseDialog from "./BaseDialog";
import "./styles/LoginDialog.css"

class LoginDialog extends React.Component {
 
    constructor(props) {
        super(props);
        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler (buttonLoginClicked) {

        let isLoginOk = false;

        if (buttonLoginClicked) {

            // TODO : Maybe, do some request to check the login.
            isLoginOk = true;
            
        }

        this.props.onLoginChanged(isLoginOk);
    }

    render() {

        if (this.props.hidden === true) {
            return null;
        }

        const bodyPart = (
            <div>
                <div className='logindialog-icon-head'>
                    <img src='logo512.png' alt='Alien Space Invader' width='64' height='64'/>
                </div>                
                <div>
                    <label htmlFor='login' className='logindialog-label'>Login:</label>
                    <input className='lc_input_textbox' id='login' type='text'></input>
                </div>
                <div className='logindialog-input-password-section'>
                    <label htmlFor='password' className='logindialog-label'>Password:</label>
                    <input className='logindialog-input-textbox' id='password' type='password'></input>
                </div>
                <div className='lc-button-section'>
                    <button className='logindialog-button' onClick={this.clickHandler.bind(this, true)}>
                        Login
                    </button>
                    <button className='logindialog-button' onClick={this.clickHandler.bind(this, false)}>
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