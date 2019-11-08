import React from 'react';
import { arrayIsEmpty } from './HelperFunctions';

export function renderAllDriverOptions(drivers){
    if(!arrayIsEmpty(drivers)){
        return drivers.map((driver, i) => (
            <option
                key={driver.id}
                value={i}
                data-id={driver.id}
                data-name={driver.full_name}
            >
                {driver.full_name}
                {
                    driver.status === 'inactive' && ` (Inactive Driver)`
                }
            </option>
        ))
    }
    return drivers;
}

export function getShipmentsWithDriverId(shipments, driverId){
    // making sure we are mathcing an integer
    driverId = parseInt(driverId, 10);
    if(!arrayIsEmpty(shipments) && driverId !== -1){
        return shipments.filter((shipment) => shipment.driver.id === driverId)
    }
    return shipments
}