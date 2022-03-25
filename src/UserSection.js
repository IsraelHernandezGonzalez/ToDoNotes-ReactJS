import React from "react";
import LoginDialog from "./dialogs/LoginDialog";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { UserAuthenticationContext } from "./contexts/user/userAuthenticationProvider";

function BoxingButton (props) {
    return (
        <Box sx={{     
            marginTop: '5px',
            marginRight: '5px',
            position: 'absolute',
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
            openLoginDialog: false,
            openMenu: false,
            anchorEl: null
        }

        this.loginClickHandler = this.loginClickHandler.bind(this);
        this.logoutClickHandler = this.logoutClickHandler.bind(this);

        this.closeLoginDialogHandler = this.closeLoginDialogHandler.bind(this);
        
        this.menuOpenClickHandler = this.menuOpenClickHandler.bind(this);
        this.menuCloseClickHandler = this.menuCloseClickHandler.bind(this);        
    }

    loginClickHandler () {
        this.setState({
            openLoginDialog: true
        });        
    }

    closeLoginDialogHandler () {
        this.setState({
            openLoginDialog: false
        });
    }  

    logoutClickHandler () {                
    
        const dispatchAuthentication = this.context[1];

        dispatchAuthentication({type: 'reset'});

        this.setState({ 
            openLoginDialog: false,
            anchorEl: null,
            openMenu: false
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

        const stateAuthentication = this.context[0];

        if (stateAuthentication.isAuthenticated) {
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
                                Hi, {stateAuthentication.userName}!
                        </Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={this.state.anchorEl}
                            open={this.state.openMenu}
                            onClose={this.menuCloseClickHandler}
                            MenuListProps={{'aria-labelledby': 'basic-button',}}
                        >
                            <MenuItem onClick={this.logoutClickHandler} sx={{paddingTop: 0, paddingBottom: 0}}>Logout</MenuItem>
                        </Menu>
                    </div>
                } />
            );
        }

        if (this.state.openLoginDialog) {
            return (
                <LoginDialog closeHandler={this.closeLoginDialogHandler}/>
            );            
        }

        return ( 
            <BoxingButton content={
                    <Button variant="contained" onClick={this.loginClickHandler}>Login</Button>
                }
            />
        );
    }

}

UserSection.contextType = UserAuthenticationContext;

export default UserSection;