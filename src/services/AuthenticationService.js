import axios from 'axios';

class AuthenticationService {

    static login (user, password) {

        if (process.env.REACT_APP_SERVICES_WITHOUT_BACKEND === 'true') {

            return new Promise(function(resolver, reject) {

                
                if (user === 'demo' && password === 'demo') {
                    return resolver({ data: true});
                }

                return resolver({ data: false});

            });

        } else {                   
            
            return axios.post("http://localhost:8080/Authentication/Login", {
                    user: user,
                    password: password
                });

        }
    }

}

export default AuthenticationService;