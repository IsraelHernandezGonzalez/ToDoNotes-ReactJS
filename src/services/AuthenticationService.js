import axios from 'axios';

class AuthenticationService {
   
   static login(user, password) {

        if (process.env.REACT_APP_SERVICES_WITHOUT_BACKEND === 'true') {
    
            return new Promise(function(resolver, reject) {
                    
                if (user === 'demo' && password === 'demo') {
        
                    return resolver({
                        isAuthenticated: true,
                        userName: 'demo',
                        token: null
                    });
                    
                } else {
    
                    return resolver({
                        isAuthenticated: false
                    });

                }
    
            });
    
        } else {
    
            return new Promise(function(resolver, reject) {
    
                axios.post("http://localhost:8080/authentication/login", {
                    userName: user,
                    password: password
                })
                .then(function(response) {
        
                    if (response.data.hasOwnProperty('token') === true) {
    
                        resolver({
                            isAuthenticated: true,
                            userName: response.data.userName,
                            token: response.data.token
                        });

                    } else {
        
                        resolver({
                            isAuthenticated: false
                        });
                    }
    
                })
                .catch(function(error) {
                    reject(error);
                });
    
            });
        }
    }
    

    static logout () {

        return ({
            isAuthenticated: false,
            userName: null,
            token: null
        });

    }

}

export default AuthenticationService;