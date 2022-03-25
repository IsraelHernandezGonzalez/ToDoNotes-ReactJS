import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';

import AlertTitle from '@mui/material/AlertTitle';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

import AutheticationService from "../services/AuthenticationService";
import { UserAuthenticationContext } from "../contexts/user/userAuthenticationProvider";

class LoginDialog extends React.Component {
 
    constructor(props) {
        super(props);

        this.state = {
            userName: '',
            password: '',   
            openAlert: false,        
            alertError: "The login or password is incorrect.",
            validation: {   
                isUserNameValid: true,
                userNameError: '',
                isPasswordValid: true,
                passwordError: ''
            }
        };

        this.userNameChangeHandler = this.userNameChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.acceptButtonClickHandler = this.acceptButtonClickHandler.bind(this);
    }

    userNameChangeHandler (event) {
        this.setState({userName: event.target.value});
    }

    passwordChangeHandler (event) {
        this.setState({password: event.target.value});
    }
  
    acceptButtonClickHandler () {        

        let userNameCheck = this.checkIfUserNameValid();
        let passwordCheck = this.checkIfPasswordValid();

        if (userNameCheck.isValid === true && passwordCheck.isValid === true) {

            this.setState({
                openAlert: false,
                validation: {
                    isUserNameValid: true,
                    userNameError: "",
                    isPasswordValid: true,
                    passwordError: ""
                }
            });

            let self = this;

            AutheticationService.login(this.state.userName, this.state.password)
                .then(function(response) {

                    if (response.isAuthenticated === true) {

                        const dispatchAuthentication = self.context[1];

                        self.setState({
                            validation: {
                                isUserNameValid: true,                        
                                isPasswordValid: true
                            }
                        });                        

                        dispatchAuthentication({ 
                            type: 'setAuthentication',
                            isAuthenticated: response.isAuthenticated,
                            userName: response.userName,
                            token: response.token
                        })                        

                    } else  {

                        self.setState({
                            openAlert: true,
                            alertError: "The login or password is incorrect."
                        });

                    }

                })
                .catch(function(error) {

                    self.setState({
                        openAlert: true,
                        alertError: error.message
                    });

                });

        } else {

            this.setState({
                validation: {
                    isUserNameValid: userNameCheck.isValid,
                    userNameError: userNameCheck.error,
                    isPasswordValid: passwordCheck.isValid,
                    passwordError: passwordCheck.error
                }
            });

        }                
    }
    
    checkIfUserNameValid () {

        if (this.state.userName.length === 0) {
            return { 
                isValid: false,
                error: 'UserName is empty.'
            }
        }

        return {
            isValid: true,
            error: ''
        };
    }

    checkIfPasswordValid () {

        if (this.state.password.length === 0) {
            return { 
                isValid: false,
                error: 'Password is empty.'
            }
        }

        return {
            isValid: true,
            error: ''
        };

    }

    getUserNameTextField() {

        if (this.state.validation.isUserNameValid === true) {
            return (
                <TextField
                  autoFocus
                  margin="dense"
                  id="userName"
                  label="User"
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={this.userNameChangeHandler}
                />
            );
        }
        else {
            return (
                <TextField
                  error
                  helperText={this.state.validation.userNameError}
                  autoFocus
                  margin="dense"
                  id="userName"
                  label="User"
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={this.userNameChangeHandler}
                />
            );
        }

    }

    getPasswordTextField() {
        
        if(this.state.validation.isPasswordValid === true) {
            return ( 
                <TextField
                    margin="dense"
                    id="password"
                    label="Password"
                    type="password"
                    fullWidth
                    variant="standard"
                    onChange={this.passwordChangeHandler}
                />
            );
        } else {
            return ( 
                <TextField
                    error
                    helperText={this.state.validation.passwordError}
                    margin="dense"
                    id="password"
                    label="Password"
                    type="password"
                    fullWidth
                    variant="standard"
                    onChange={this.passwordChangeHandler}
                />
            );
        }

    }

    render() {

        let userNameComponent = this.getUserNameTextField();
        let passwordComponent = this.getPasswordTextField();

        const alert = (
            <Box sx={{ width: '100%' }}>
            <Collapse in={this.state.openAlert}>
              <Alert
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      this.setState({openAlert: false});
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ mb: 2 }}
                severity="error"
              >
                <AlertTitle>Error</AlertTitle>
                {this.state.alertError}
              </Alert>
            </Collapse>           
          </Box>
        );

        return (
            <Dialog open={true} onClose={this.props.closeHandler}>
              <DialogTitle>Sign in</DialogTitle>
              <DialogContent>                
                {userNameComponent}
                {passwordComponent}
              </DialogContent>
              <DialogActions>
                <Button onClick={this.acceptButtonClickHandler}>Accept</Button>
                <Button onClick={this.props.closeHandler}>Cancel</Button>
              </DialogActions>              
              {alert}
            </Dialog>          
        );    
    }

}

LoginDialog.contextType = UserAuthenticationContext;

export default LoginDialog;