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
    getIdleDrivers(){
        return fetch(`${config.API_ENDPOINT}/drivers/idle`, {
            method: 'GET',
            headers: {
                "content-type": "application/json",
                "Authorization": `bearer ${TokenService.getAuthToken()}`
            }
        })
        .then(response => response.json())
        .then(idleDrivers => idleDrivers)
        .catch((error) => {
            console.log(error);
        })
    },
    updateEquipment(driverId, equipmentId){
        
    }
}

export default DriversService;