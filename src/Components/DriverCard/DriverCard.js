import React, {Component} from 'react';
import './DriverCard.css';
import {Link} from 'react-router-dom';
import config from '../../config';
import AppContext from '../../Contexts/AppContext';
import { arrayIsEmpty } from '../../HelperFunctions/HelperFunctions';


class DriverCard extends Component{
    
    static defaultProps = {
        driver: {}
    }

    static contextType = AppContext

    render(){

        const {driver} = this.props;
        const {idleDrivers, shipments} = this.context;
        let shipmentId = -1;
        const busyDriver = arrayIsEmpty(idleDrivers.filter(idleDriver => idleDriver.id === driver.id));
        if(busyDriver){
            shipmentId = shipments.filter((shipment) => shipment.driver.id === driver.id)[0].id;
        }

        return(
            <div className='DriverCard grey-back blue-text'>
                <div className='flex-row'>
                    <div className='card-div'>
                        <h6>Driver</h6>
                        <p>{driver.full_name}</p>
                    </div>
                    <div className='card-div'>
                        <h6>Pay Rate</h6>
                        <p>${driver.pay_rate}</p>
                    </div>
                    <div className='card-div'>
                        <h6 className='small-header'>Equipment #</h6>
                        <p>{driver.equipment.unit_num ? driver.equipment.unit_num : 'No Equipment'}</p>
                    </div>
                </div>
                {
                    shipmentId === -1 
                    ?
                    <div className='driver-buttons'>
                        <Link to={`${config.BASEPATH}/driver/edit/${driver.id}`} className='app-button'>
                            Edit
                        </Link>
                        <button className='app-button'>
                            Delete
                        </button>
                    </div>
                    :
                    <div className='driver-buttons'>
                        <span>
                            Driver Busy
                        </span>
                        <Link className='app-button' to={`${config.BASEPATH}/load/${shipmentId}`}>
                            View Load
                        </Link>
                    </div>
                }
                
            </div>
        )
    }
}

export default DriverCard;