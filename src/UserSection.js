import React from "react";
import LoginDialog from "./dialogs/LoginDialog";
import './styles/UserSection.css'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


function BoxingButton (props) {
    return (
        <Box sx={{     
            marginTop: '5px',
            marginRight: '5px',
            position: 'fixed',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',                
            width: '100%'
        }}>                
            {props.content}
        </Box>
    );
}


class UserSection extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            loginDialogHidden: true,
            openMenu: false,
            anchorEl: null
        }

        this.loginClickHandler = this.loginClickHandler.bind(this);
        this.loginChangedHandler = this.loginChangedHandler.bind(this);
        
        this.menuOpenClickHandler = this.menuOpenClickHandler.bind(this);
        this.menuCloseClickHandler = this.menuCloseClickHandler.bind(this);
        this.logoutClickHandler = this.logoutClickHandler.bind(this);
    }

    loginClickHandler () {
        this.setState({
            loginDialogHidden: false
        });        
    }
    
    loginChangedHandler (event) {

        this.setState({
            loginDialogHidden: true,
            openMenu: false,
            anchorEl: null
        });   

        // Let the top know the user is logged.
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

    menuOpenClickHandler (event) {
        this.setState({
            anchorEl: event.currentTarget,
            openMenu: true
        });
    };
    
    menuCloseClickHandler () {
        this.setState({
            anchorEl: null,
            openMenu: false
        });
    };
    
    render() {        
        
        if (this.props.user.isLogged) {
            return (
                <BoxingButton content={
                    <div>
                        <Button
                                id="basic-button"
                                variant="contained"
                                aria-controls={this.state.openMenu ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={this.state.openMenu ? 'true' : undefined}
                                onClick={this.menuOpenClickHandler}
                        >                                
                                Hi, {this.props.user.name}!
                        </Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={this.state.anchorEl}
                            open={this.state.openMenu}
                            onClose={this.menuCloseClickHandler}
                            MenuListProps={{'aria-labelledby': 'basic-button',}}
                        >
                            <MenuItem  onClick={this.logoutClickHandler}>Logout</MenuItem>
                        </Menu>
                    </div>
                } />
            );
        }

        if (!this.state.loginDialogHidden) {
            return (
                <LoginDialog onLoginChanged={this.loginChangedHandler}/>                        
            );            
        }

        return (            
            <BoxingButton content={
                <Button variant="contained" onClick={this.loginClickHandler}>Login</Button>
            } />
        );
    }

}

export default UserSection;