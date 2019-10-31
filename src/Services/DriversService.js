import TokenService from './TokenService';
import config from '../config';

const DriversService = {
    getDriversData(){
        return fetch(`${config.API_ENDPOINT}/drivers`, {
            method: 'GET',
            headers: {
                "content-type": "application/json",
                "Authorization": `bearer ${TokenService.getAuthToken()}`
            }
        })
        .then(response => response.json())
        .then(driversData => driversData)
        .catch((error) => {
            console.log(error);
        })
    },
}

export default DriversService;