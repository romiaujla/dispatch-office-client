import config from '../config';

const AuthApiService = {
    // login authorization
    postLogin(credentials){
        return fetch(`${config.API_ENDPOINT}/auth/login`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(credentials)
        })
        .then(res => {
            if(!res.ok) {
                return res.json().then(e => {
                    throw new Error(e.error.message)
                })
            }
            
            return res.json();
        })
        .then(res => {
            return res
        })
        .catch(error => {
            return error;
        })
    }
}

export default AuthApiService;