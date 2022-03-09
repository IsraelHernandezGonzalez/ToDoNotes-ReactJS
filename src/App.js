import './styles/App.css';
import UserSection from './UserSection';
import TodoListSection from './ToDoListSection';
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

  render() {
    
    let bodySection = null;
        
    if (this.state.user.isLogged) {
      bodySection = (
          <div className="app-body">                            
            <TodoListSection user={this.state.user.name} />
          </div>  
        );
    }

    return (
      <div className="app">
        <header className="app-header">                           
            <p>To Do List example - ReactJS first contact</p>            
            <UserSection 
              user={this.state.user}
              onLoginStateChanged={this.loginStateChangedHandler} />                        
        </header>
        {bodySection}       
        <footer className="app-footer">
          <address>
            <p>Author: Israel Hernández González - <a href="mailto:ihergonu@gmail.com">ihergonu@gmail.com</a></p>        
          </address>
        </footer>     
      </div>
    );  
  }
}

export default App;