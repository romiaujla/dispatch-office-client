import TokenService from './TokenService';
import config from '../config';

const DriversService = {
    getDriversData() {
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

    getIdleDrivers() {
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

    updateEquipment(id, equipment_id) {
        return fetch(`${config.API_ENDPOINT}/drivers/${id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                Authorization: `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify({
                equipment_id
            })
        })
            .then(response => response.json())
            .then(driver => driver)
            .catch((error) => {
                console.log(error);
            })
    },

    updateDriver(driver){
        return fetch(`${config.API_ENDPOINT}/drivers/${driver.id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                Authorization: `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify({
                full_name: driver.full_name,
                pay_rate: driver.pay_rate,
                equipment_id: driver.equipment_id,
                status: driver.status
            })
        })
            .then(response => response.json())
            .then(driver => driver)
            .catch((error) => {
                console.log(error);
            })
    },

    addDriver(driver){
        return fetch(`${config.API_ENDPOINT}/drivers`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                Authorization: `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify({
                full_name: driver.full_name,
                pay_rate: driver.pay_rate,
                equipment_id: driver.equipment_id,
            })
        })
            .then(response => response.json())
            .then(driver => driver)
            .catch((error) => {
                console.log(error);
            })
    }
}

export default DriversService;