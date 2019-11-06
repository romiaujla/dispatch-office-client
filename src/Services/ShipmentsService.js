import TokenService from "./TokenService";
import config from "../config";

const ShipmentsSerivce = {
    insertShipment(shipment){
        return fetch(`${config.API_ENDPOINT}/shipments`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
              Authorization: `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify({
                rate: shipment.rate || 0.0, 
                status: shipment.status, 
                miles: shipment.miles || 0, 
                driver_id: shipment.driver_id || null, 
                broker: shipment.broker || null,
                pickup_date: shipment.pickup_date,
                delivery_date: shipment.delivery_date,
                pickup_city: shipment.pickup_city,
                pickup_state: shipment.pickup_state,
                pickup_zipcode: shipment.pickup_zipcode,
                delivery_city: shipment.delivery_city,
                delivery_state: shipment.delivery_state,
                delivery_zipcode: shipment.delivery_zipcode
            })
          })
            .then(response => response.json())
            .then(shipment => shipment)
            .catch(error => {
              console.log(error);
            });
    },
    updateShipment(){
        // do stuff here 
    }
}

export default ShipmentsSerivce;