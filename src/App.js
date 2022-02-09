import './styles/App.css';
import UserSection from './UserSection';
import React from 'react';
import NewNoteDialog from './dialogs/NewNoteDialog';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
       user: { 
         name: '',
         isLogged: false
      },
      showNewNoteDialog: false
    };

    this.loginStateChangedHandler = this.loginStateChangedHandler.bind(this);    
    this.addNoteClickHandler = this.addNoteClickHandler.bind(this);
    this.newNoteDialogClosingEventHandler = this.newNoteDialogClosingEventHandler.bind(this);
  }

  loginStateChangedHandler(e) {

    if (e.isLogingOk) {

      this.setState({
        user: { 
          name: e.login,
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

  addNoteClickHandler () {
    this.setState({showNewNoteDialog: true});
  }

  newNoteDialogClosingEventHandler () {
    this.setState({showNewNoteDialog: false});
  }


  render() {
    
    let noteSection = null;
        
    if (this.state.user.isLogged) {
      noteSection = (
          <div className="app-body">
            <button onClick={this.addNoteClickHandler}>
              Add note
            </button>
            <NewNoteDialog show={this.state.showNewNoteDialog} onDialogClosingEvent={this.newNoteDialogClosingEventHandler} />
          </div>  
        );
    }

    return (
      <div className="app">
        <header className="app-header">               
            <img src='logo64.png' alt='Alien - React first contact logo' />   
            <p>React first contact</p>            
            <UserSection 
              user={this.state.user}
              onLoginStateChanged={this.loginStateChangedHandler} />                        
        </header>
        {noteSection}    
        <footer className="app-footer">
          <address>
            <p>Author: Israel Hernández González - <a href="mailto:israel.hernandez@gmail.com">israel.hernandez@gmail.com</a></p>        
          </address>
        </footer>     
      </div>
    );  
  }
}

export default App;