const path = 'http://localhost:8000/api';
// const path = 'https://rocky-waters-07125.herokuapp.com/api';

export default {
    API_ENDPOINT: process.env.API_ENDPOINT || path,
    TOKEN_KEY: process.env.TOKEN_KEY || '9e7d73be-f7f1-11e9-8f0b-362b9e155667',
    BASEPATH: '/dispatch-office-client',
}