import React from 'react';
import './styles/LoginControl.css';

function LoginButton(props) {
    return (
      <button className='lc_button' onClick={props.onClick}>
        Login
      </button>
    );
}
  
function LogoutButton(props) {
    return (
        <button className='lc_button' onClick={props.onClick}>
        Logout
        </button>
    );
}

function CancelButton(props) {
  return (
      <button className='lc_button' onClick={props.onClick}>
        Cancel
      </button>
  );
}

function UserGreeting(props) {
    return <h1>Welcome back!</h1>;
}
  
function GuestGreeting(props) {
    return <h1>Please sign up.</h1>;
}  

function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;

    if (isLoggedIn) {
      return <UserGreeting />;
    }

    return <GuestGreeting />;
  }

function LoginTextBox(props) {
  return (
    <div>
      <label for='login' className='lc_label'>Login:</label>
      <input class='lc_input_textbox' id='login' type='text'></input>
    </div>
  );
}

function PasswordTextBox(props) {
  return (
    <div class='lc_input_password_section'>
      <label for='password' className='lc_label'>Password:</label>
      <input className='lc_input_textbox' id='password' type='password'></input>
    </div>
  );
}
  

class LoginControl extends React.Component {
    
    constructor(props) {
      super(props);
      this.handleLoginClick = this.handleLoginClick.bind(this);
      this.handleLogoutClick = this.handleLogoutClick.bind(this);
      this.handleCancelClick = this.handleCancelClick.bind(this);
      this.state = {isLoggedIn: false};
    }

    handleLoginClick() {
      this.setState({isLoggedIn: true});
    }

    handleLogoutClick() {
      this.setState({isLoggedIn: false});
    }    

    handleCancelClick() {
      this.setState({isLoggedIn: false});
    }

    render() {
      const isLoggedIn = this.state.isLoggedIn;
      let button;

      if (isLoggedIn) {
        button = <LogoutButton onClick={this.handleLogoutClick} />;
      } else {
        button = <LoginButton onClick={this.handleLoginClick} />;
      }

      return (
        <div className='lc_container'>
          <div className='lc_icon_head'>
            <img src='alien-pixelated-shape-of-a-digital-game.png' alt='Alien Space Invader' width='64' height='64'/>
          </div>
          {/* <Greeting isLoggedIn={isLoggedIn} /> */}
          <LoginTextBox />
          <PasswordTextBox />
          <div className='lc_button_section'>
            {button}
            <CancelButton onClick={this.handleCancelClick} />
          </div>
        </div>
      );
    }
  }

  
export default LoginControl;