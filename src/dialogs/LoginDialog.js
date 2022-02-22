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

import LoginService from "../services/LoginService";

class LoginDialog extends React.Component {
 
    constructor(props) {
        super(props);

        this.state = {
            login: '',
            password: '',
            open: true,          
            openAlert: false,        
            alertError: "The login or password is incorrect.",
            validation: {   
                isLoginValid: true,
                loginError: '',
                isPasswordValid: true,
                passwordError: ''
            }
        };

        this.loginChangeHandler = this.loginChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.buttonClickHandler = this.buttonClickHandler.bind(this);        
        this.closeModalHandler = this.closeModalHandler.bind(this);
    }

    loginChangeHandler (event) {
        this.setState({login: event.target.value});
    }

    passwordChangeHandler (event) {
        this.setState({password: event.target.value});
    }
  
    buttonClickHandler (buttonAcceptClicked) {        

        if (buttonAcceptClicked === true) {

            let loginCheck = this.checkIfLoginValid();
            let passwordCheck = this.checkIfPasswordValid();

            if (loginCheck.isValid === true && passwordCheck.isValid === true) {

                let callBackFunc = function (isLogingOk, error) {

                    if (typeof(error) !== 'undefined' || error != null) {
                        this.setState({
                            openAlert: true,
                            alertError: error
                        });
                        return;
                    }

                    if (isLogingOk === true) {

                        this.setState({
                            validation: {
                                isLoginValid: true,                        
                                isPasswordValid: true
                            }
                        });
                    
                        this.props.onLoginChanged({
                                isLoginOk: true,
                                login: this.state.login,
                                open: false
                        });
                    } else  {
                        this.setState({
                            openAlert: true,
                            alertError: "The login or password is incorrect."
                        });
                    }

                }

                callBackFunc = callBackFunc.bind(this);

                this.setState({
                    openAlert: false,
                    validation: {
                        isLoginValid: true,
                        loginError: "",
                        isPasswordValid: true,
                        passwordError: ""
                    }
                });

                // TODO : Maybe, do some request to check the login.
                LoginService.login(this.state.login, this.state.password, callBackFunc);                 

            } else {

                this.setState({
                    validation: {
                        isLoginValid: loginCheck.isValid,
                        loginError: loginCheck.error,
                        isPasswordValid: passwordCheck.isValid,
                        passwordError: passwordCheck.error
                    }
                });

            }            
        } else {

            this.props.onLoginChanged({
                        isLoginOk: false,
                        login: '',
                        open: false
            });
            
        }
    };    

    closeModalHandler () {
        this.setState({openModal: false});
    }

    checkIfLoginValid () {

        if (this.state.login.length === 0) {
            return { 
                isValid: false,
                error: 'Login is empty.'
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

    render() {

        let loginComponent;
        let passwordComponent;

        if (this.state.validation.isLoginValid === true) {
            loginComponent = (
                <TextField
                  autoFocus
                  margin="dense"
                  id="login"
                  label="login"
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={this.loginChangeHandler}
                />
            );
        }
        else {
            loginComponent = (
                <TextField
                  error
                  helperText={this.state.validation.loginError}
                  autoFocus
                  margin="dense"
                  id="login"
                  label="login"
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={this.loginChangeHandler}
                />
            );
        }

        if(this.state.validation.isPasswordValid === true) {
            passwordComponent = ( 
                <TextField
                    margin="dense"
                    id="password"
                    label="password"
                    type="password"
                    fullWidth
                    variant="standard"
                    onChange={this.passwordChangeHandler}
                />
            );
        } else {
            passwordComponent = ( 
                <TextField
                    error
                    helperText={this.state.validation.passwordError}
                    margin="dense"
                    id="password"
                    label="password"
                    type="password"
                    fullWidth
                    variant="standard"
                    onChange={this.passwordChangeHandler}
                />
            );
        }

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
            <Dialog open={this.state.open} onClose={this.handleClose}>
              <DialogTitle>Sign in</DialogTitle>
              <DialogContent>                
                {loginComponent}
                {passwordComponent}
              </DialogContent>
              <DialogActions>
                <Button onClick={this.buttonClickHandler.bind(this, true)}>Accept</Button>
                <Button onClick={this.buttonClickHandler.bind(this, false)}>Cancel</Button>
              </DialogActions>              
              {alert}
            </Dialog>          
        );    
    }

}

export default LoginDialog;