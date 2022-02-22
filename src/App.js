import './styles/App.css';
import UserSection from './UserSection';
import TodoListSection from './ToDoListSection';
import React from 'react';
import NewNoteDialog from './dialogs/NewNoteDialog';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';

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
    
    let bodySection = null;
        
    if (this.state.user.isLogged) {
      bodySection = (
          <div className="app-body">            
            <Button onClick={this.addNoteClickHandler}>
              <Icon>add_circle</Icon>Add note
            </Button>
            <NewNoteDialog show={this.state.showNewNoteDialog} user={this.state.user.name} onDialogClosingEvent={this.newNoteDialogClosingEventHandler} />            
            <TodoListSection user={this.state.user.name} />
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
        {bodySection}       
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