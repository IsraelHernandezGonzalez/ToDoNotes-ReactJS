import './styles/App.css';
import UserSection from './UserSection';
import TodoListSection from './ToDoListSection';
import React from 'react';
import { UserAuthenticationProvider } from './contexts/user/userAuthenticationProvider';

class App extends React.Component {

  render() {
    
    // let bodySection = null;
        
    // if (this.state.user.isLogged) {
    //   bodySection = (
    //       <div className="app-body">                            
    //         <TodoListSection />
    //       </div>  
    //     );
    // }

    return (
      <div className="app">
        <UserAuthenticationProvider>
          <header className="app-header">                           
              <p>To Do Notes - ReactJS first contact</p>            
              <UserSection />                        
          </header>
          {/* {bodySection}        */}
          <div className="app-body">                            
            <TodoListSection />
          </div>  
          <footer className="app-footer">
            <address>
              <p>Author: Israel Hernández González - <a href="mailto:ihergonu@gmail.com">ihergonu@gmail.com</a></p>        
            </address>
          </footer>     
        </UserAuthenticationProvider>
      </div>
    );  
  }
}

export default App;