import './styles/App.css';
import LoginDialog from './dialogs/LoginDialog';
import UserSection from './UserSection';
import React from 'react';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
       user: { 
         name: '',
         isLogged: false
      }
    };

    this.loginStateChangedHandler = this.loginStateChangedHandler.bind(this);    
  }

  loginStateChangedHandler(e) {

    if (e.isLogingOk) {

      this.setState({
        user: { 
          name: 'Default',
          isLogged: true
        }
      });

    } else {
      this.setState({
        user: { 
          name: '',
          isLogged: false
        }
      });
    }    
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">                  
            <img src='logo128.png' alt='Alien - React first contact logo' />
            <p>React first contact</p>
            <UserSection 
              user={this.state.user}
              onLoginStateChanged={this.loginStateChangedHandler} />    
        </header>
        <div className="App-body">
        </div>      
        <footer className="App-footer">
          <address>
            <p>Author: Israel Hernández González - <a href="mailto:israel.hernandez@gmail.com">israel.hernandez@gmail.com</a></p>        
          </address>
        </footer>     
      </div>
    );  
  }
}

export default App;