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
        }).then(res => {
            if(!res.ok) {
                return res.json().then(e => {
                    console.log(e);
                    Promise.reject(e);
                })
            }
            return res.json();
        })
    }
}

export default AuthApiService;