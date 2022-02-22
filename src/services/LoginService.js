import axios from 'axios';

class LoginService {

    static login (user, password, callBackFunc) {

        if (process.env.REACT_APP_SERVICES_WITHOUT_BACKEND === 'true') {

            let isOk = false;

            if (user === 'demo' && password === 'demo') {
                isOk = true;
            }

            callBackFunc(isOk);

        } else {
            
            const parameters = {
                params : {
                    user: user,
                    password: password
                }
            };        
            
            axios.get("http://localhost:8080/Authentication/Login", parameters)
                .then(function(response)  {
                    callBackFunc(response.data);
                })
                .catch(function(error) {
                    callBackFunc(false, error.message);
                });

        }
    }

}

export default LoginService;