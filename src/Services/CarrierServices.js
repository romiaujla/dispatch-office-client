import TokenService from './TokenService';
import config from '../config';

const CarrierService = {
    getCarrierData(){
        // return the response of a fetch that returns all the carrier info.
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
    }
}

export default CarrierService;