import TokenService from './TokenService';
import config from '../config';

const CarrierService = {
    getCarrierData(){
        return fetch(`${config.API_ENDPOINT}/carrier`, {
            method: 'GET',
            headers: {
                "content-type": "application/json",
                "Authorization": `bearer ${TokenService.getAuthToken()}`
            }
        })
        .then(res => res.json())
        .then(carrierData => {
            return carrierData;
        })
        .catch(err => {
            console.log(err);
        })
    },
    getCarrierInfo(){
        return fetch(`${config.API_ENDPOINT}/carrier-info`, {
            method: 'GET',
            headers: {
                "content-type": "application/json",
                "Authorization" : `bearer ${TokenService.getAuthToken()}`
            }
        })
        .then(res => res.json())
        .then(carrierInfo =>  {
            return carrierInfo;
        })
        .catch(err => {
            console.log(err);
        })
    }
}

export default CarrierService;