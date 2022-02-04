import React from "react";
import LoginDialog from "./dialogs/LoginDialog";

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
    
    loginChangedHandler (isLogingOk) {

        // Let know the top the user has been logged.
        this.props.onLoginStateChanged({
            isLogingOk: isLogingOk
        });

        this.setState({
            loginDialogHidden: true
        });   

    }

    logoutClickHandler () {
        this.props.onLoginStateChanged({
            isLogingOk: false
        });

        this.setState({
            loginDialogHidden: true
        });   
    }

    render() {        
        
        if (this.props.user.isLogged) {
            return (
                <div>
                    <h2>Hi, {this.props.user.name}</h2>
                    <button onClick={this.logoutClickHandler}>(Logout)</button>
                </div>
            );
        }

        return (
            <div>
                <LoginDialog hidden={this.state.loginDialogHidden} onLoginChanged={this.loginChangedHandler}/>
                <button onClick={this.clickHandler}>
                    Login
                </button>
            </div>
        );
    }

}

export default UserSection;