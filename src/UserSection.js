import React from "react";
import LoginDialog from "./dialogs/LoginDialog";
import './styles/UserSection.css'

class UserSection extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            loginDialogHidden: true
        }

        this.clickHandler = this.clickHandler.bind(this);
        this.loginChangedHandler = this.loginChangedHandler.bind(this);
        this.logoutClickHandler = this.logoutClickHandler.bind(this);
    }

    clickHandler () {
        this.setState({
            loginDialogHidden: false
        });        
    }
    
    loginChangedHandler (event) {

        this.setState({
            loginDialogHidden: true
        });   

        // Let know the top the user has been logged.
        this.props.onLoginStateChanged({
            isLogingOk: event.isLoginOk,
            login: event.login
        });
    }

    logoutClickHandler () {
        
        this.setState({
            loginDialogHidden: true
        });   

        this.props.onLoginStateChanged({
            isLogingOk: false
        });
    }

    render() {        
        
        if (this.props.user.isLogged) {
            return (
                <div className="user-section-container">
                    <span>Hi, {this.props.user.name}!</span>
                    <button onClick={this.logoutClickHandler}>Logout</button>
                </div>
            );
        }

        if (!this.state.loginDialogHidden) {
            return (
                <div className="user-section-container">
                     <LoginDialog onLoginChanged={this.loginChangedHandler}/>        
                </div>
            );            
        }

        return (
            <div className="user-section-container">        
                <button onClick={this.clickHandler}>Login</button>
            </div>
        );


        // return (
        //     <div className="user-section-container">
        //         <LoginDialog hidden={this.state.loginDialogHidden} onLoginChanged={this.loginChangedHandler}/>
        //         <button onClick={this.clickHandler}>Login</button>
        //     </div>
        // );
    }

}

export default UserSection;