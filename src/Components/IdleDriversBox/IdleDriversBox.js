import React, { Component } from 'react';
import './IdleDriversBox.css';
import AppContext from '../../Contexts/AppContext';

class IdleDriversBox extends Component {
    
    constructor(props) {
        super(props);
        this.state = {  }
    }

    static contextType = AppContext;

    getIdleDrivers = () => {
        const {driversData, shipments} = this.context
        const busyDrivers = shipments.filter(shipment => {
            if(shipment.status !== 'un-assigned' || shipment.status !== 'completed'){
                return shipment.driver;
            }
        });
        console.log(busyDrivers);
        
    }

    render() { 
        return (
            <div className='IdleDriversBox'>
                Idle Drivers Box
                {this.getIdleDrivers()}
            </div>
        );
    }
}
 
export default IdleDriversBox;