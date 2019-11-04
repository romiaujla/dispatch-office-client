import React, { Component } from 'react';
import './EquipmentCard.css';
import { Link } from 'react-router-dom';
import config from '../../config';
import AppContext from '../../Contexts/AppContext';
import {
    arrayIsEmpty
} from '../../HelperFunctions/HelperFunctions'

class EquipmentCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editingMode: false
        }
    }

    static contextType = AppContext

    handleDeleteEquipment = (id) => {

        let { equipments } = this.context
        const { drivers, idleDrivers } = this.context
        equipments = equipments.filter((equipment) => equipment.id !== id)
        drivers.map(driver => {
            if (driver.equipment.id === id) {
                driver.equipment = {}
            }
            return driver
        })
        idleDrivers.map(driver => {
            if (driver.equipment.id === id) {
                driver.equipment = {}
            }
            return driver
        })

        this.context.setEquipments(equipments);
        this.context.setDrivers(drivers);
        this.context.setIdleDrivers(idleDrivers);

    }

    render() {

        const { equipment } = this.props;
        const { idleEquipments, shipments } = this.context;
        const busyEquipment = arrayIsEmpty(idleEquipments.filter((idleEquipment) => idleEquipment.id === equipment.id))
        let shipmentId = -1;
        if(busyEquipment && equipment.driver.hasOwnProperty('id')){
            shipmentId = shipments.filter((shipment) => shipment.equipment.id === equipment.id)[0].id;
        }
        
        return (
            <div className='EquipmentCard grey-back blue-text'>

                <div className='flex-row'>
                    <div className='equip-num'>
                        <h6>Unit Num</h6>
                        <p>{equipment.unit_num}</p>
                    </div>
                    {
                        equipment.driver !== null &&
                        <div className='equip-driver'>
                            <h6>Driver</h6>
                            <p className={equipment.driver.full_name ? '' : 'no-driver'}
                            >{equipment.driver.full_name ? equipment.driver.full_name : 'No Driver Assigned'}</p>
                        </div>
                    }
                </div>
                {
                    shipmentId === -1 
                    ?
                    <div className='equipment-buttons'>
                        <Link className='app-button' to={`${config.BASEPATH}/equipment/edit/${equipment.id}`}>
                            Edit
                        </Link>
                        <button className='app-button' onClick={() => { this.handleDeleteEquipment(equipment.id) }}>
                            Delete
                        </button>
                    </div>
                    :
                    <div className='equipment-buttons'>
                        <span>
                            Equipment Busy
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

export default EquipmentCard;