import React, { Component } from 'react';
import './LoadByIdPage.css';
import AppContext from '../../Contexts/AppContext';
import {
    arrayIsEmpty,
    objectIsEmpty,
    renderLoadStatusOptions,
    formatCurrency,
    getAvailableDrivers,
    isNotUndefined,
    routeUserTo,
    handleGoBack
} from '../../HelperFunctions/HelperFunctions';
import DriversDropDown from '../../Components/DriversDropDown/DriversDropDown';
import config from '../../config';
import {Link} from 'react-router-dom';
import ShipmentsService from '../../Services/ShipmentsService';

class LoadByIdPage extends Component {

    static defaultProps = {
        rprops: {},
        shipments: [],
        idleDrivers: []
    }

    static contextType = AppContext

    constructor(props) {
        super(props);

        const id = parseInt(props.rprops.match.params.id, 10)
        const { shipments } = props;
        let shipment = {};
        let status = '';
        let avaialableDrivers = [];
        let driverAssigned = -1;
        if (!arrayIsEmpty(shipments)) {
            shipment = shipments.filter(shipment => shipment.id === id)[0];
            status = shipment.status
            if (shipment.status === 'un-assigned') {
                avaialableDrivers = getAvailableDrivers(props.idleDrivers)
                driverAssigned = isNotUndefined(avaialableDrivers[0]) ? avaialableDrivers[0].id : -1
            }
        }
        this.state = {
            shipment,
            status,
            avaialableDrivers,
            driverAssigned,
            completedShipment: status === 'completed' ? true : false
        }
    }

    // remove drivers when status is changed to un-assigned
    removeDriverAndEquipmentFromShipment = (shipment) => {

        this.sendDriverToIdleDrivers(shipment);

        shipment.driver = {}
        shipment.equipment = {}

        return shipment;
    }

    sendDriverToIdleDrivers = (shipment) => {
        const {idleDrivers} = this.context
        const driver = {
            ...shipment.driver,
            pay_rate: shipment.driver.pay_rate.toString(), // converting to string to make sure all objects are of the same data type
            equipment: shipment.equipment
        }

        this.context.setIdleDrivers([
            ...idleDrivers,
            driver
        ])
    }

    handleChangeLoadStatus = (e) => {
        e.preventDefault();

        const { status } = this.state;
        this.setState({
            shipment: {
                ...this.state.shipment,
                status
            }
        }, () => {
            const { shipment } = this.state;
            let { shipments } = this.props;

            ShipmentsService.updateShipment({id: shipment.id, status})
            shipments = shipments.map((propShipment) => {
                if (propShipment.id === shipment.id) {
                    propShipment.status = status
                    if (status === 'un-assigned') {
                        propShipment = this.removeDriverAndEquipmentFromShipment(propShipment);
                        // update shipment by setting driver_id to null and status to un-assigned
                        ShipmentsService.updateShipment({id: shipment.id, driver_id: null})
                    }
                    if(status === 'completed'){
                        this.setState({
                            completedShipment: true
                        })
                        this.sendDriverToIdleDrivers(propShipment);
                    }
                }
                return propShipment
            })
            this.context.setShipments(shipments);
        })
    }

    handleAssignDriver = (e) => {
        e.preventDefault();
        let { shipment, driverAssigned } = this.state;
        let { idleDrivers, shipments } = this.props;

        let driver = {};
        let equipment = {};

        idleDrivers = idleDrivers.map((idleDriver) => {
            if (idleDriver.id === driverAssigned) {
                driver = {
                    id: driverAssigned,
                    full_name: idleDriver.full_name,
                    pay_rate: idleDriver.pay_rate,
                    status: idleDriver.status
                }
                equipment = {
                    id: idleDriver.equipment.id,
                    status: idleDriver.equipment.status,
                    unit_num: idleDriver.equipment.unit_num
                }
            }
            return idleDriver;
        })
        idleDrivers = idleDrivers.filter((idleDriver) => idleDriver.id !== driverAssigned);

        shipments = shipments.map((propShipment) => {
            if (propShipment.id === shipment.id) {
                propShipment = {
                    ...propShipment,
                    driver,
                    equipment,
                    status: 'dispatched'
                }
            }
            return propShipment
        })

        // update shipment in the database
        ShipmentsService.updateShipment({id: shipment.id ,driver_id: driverAssigned, status: 'dispatched'})

        this.setState({
            shipment: {
                ...this.state.shipment,
                status: 'dispatched'
            },
            status: 'dispatched',
            avaialableDrivers: idleDrivers,
            driverAssigned: -1
        })

        this.context.setIdleDrivers(idleDrivers);
        this.context.setShipments(shipments);

    }

    onDriverDropDownChange = (id) => {
        this.setState({
            driverAssigned: parseInt(id, 10)
        })
    }

    handleShipmentDelete = (shipmentId) => {
        
        let {shipments, idleDrivers} = this.context
        // if shipment has driver, send him to idle driver queue
        const shipmentToDelete = shipments.filter((shipment) => shipment.id === shipmentId)[0];

        let driver = {};
        if(!objectIsEmpty(shipmentToDelete.driver)){
            driver = {
                ...shipmentToDelete.driver,
                equipment: {
                    ...shipmentToDelete.equipment,
                }
            }

            idleDrivers = [
                ...idleDrivers,
                driver
            ]            
        }

        shipments = shipments.filter((shipment) => shipment.id !== shipmentId);

        // remove shipment from the database
        ShipmentsService.deleteShipment(shipmentId);

        this.context.setIdleDrivers(idleDrivers);
        this.context.setShipments(shipments);
        routeUserTo(this.props.rprops.history, '/');

    }

    renderUpdateLoadStatusBox = (shipment) => {
        return (
            <form onSubmit={(e) => { this.handleChangeLoadStatus(e) }}>
                <fieldset>
                <legend><h6><label htmlFor='status'>Status</label></h6></legend>
                {
                    <select
                        className='select-css'
                        name='status'
                        id='status'
                        value={this.state.status}
                        onChange={(e) => { this.setState({ status: e.target.value }) }}>
                        {
                            renderLoadStatusOptions(this.context.loadStatus)
                        }
                    </select>
                }
                {
                    this.state.status !== shipment.status
                    ?
                    <button type='submit' className='app-button'>
                        Change Status
                    </button>
                    :
                    <button className='app-button' disabled>
                        Change Status
                    </button>
                }
            </fieldset>
        </form>
                
        )
    }

    

    render() {

        const { shipment } = this.state
        let driverPayout = 0;
        if (!objectIsEmpty(shipment)) {
            driverPayout = shipment.driver.pay_rate * shipment.miles;
        }

        return (
            !objectIsEmpty(shipment) ?
                <section className='LoadByIdPage width-wrapper'>
                    <div className='load-header'>
                        <button className='app-button' onClick={() => {handleGoBack(this.props.rprops.history)}}>
                            Go Back
                        </button>
                        <Link className='app-button edit-button' to={`${config.BASEPATH}/load/edit/${shipment.id}`}>
                            Edit
                        </Link>
                        <button className='app-button' onClick={() => {this.handleShipmentDelete(shipment.id)}}>
                            Delete
                        </button>
                    </div>
                    <div className='flex-row'>
                        <div className='pick-up-info box-style'>
                            <h3>Pick Up Info</h3>
                            <div className='pickup info-wrapper'>
                                <div className='pickup info date'>
                                    <h6>Date</h6>
                                    <p>{shipment.pickup_date}</p>
                                </div>
                                <div className='pickup info city'>
                                    <h6>City, ST</h6>
                                    <p>{shipment.pickup_warehouse.city}, {shipment.pickup_warehouse.state}</p>
                                </div>
                                <div className='pickup info state'>
                                    <h6>Zipcode</h6>
                                    <p>{shipment.pickup_warehouse.zipcode}</p>
                                </div>
                            </div>
                        </div>
                        <div className='delivery-info box-style'>
                            <h3>Delivery Info</h3>
                            <div className='delivery info-wrapper'>
                                <div className='delivery info'>
                                    <h6>Delivery Date</h6>
                                    <p>{shipment.delivery_date}</p>
                                </div>
                                <div className='delivery info city'>
                                    <h6>City, ST</h6>
                                    <p>{shipment.delivery_warehouse.city}, {shipment.delivery_warehouse.state}</p>
                                </div>
                                <div className='delivery info state'>
                                    <h6>Zipcode</h6>
                                    <p>{shipment.delivery_warehouse.zipcode}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='additional-info box-style'>
                        <h3>Additional Info</h3>
                        <div className='flex-row'>
                            <div className='additional-info info-wrapper'>
                                <div className='additional-info info'>
                                    <h6>Miles</h6>
                                    <p>{shipment.miles}</p>
                                </div>
                                <div className='additional-info info city'>
                                    <h6>Rate</h6>
                                    <p className='red-text'>{formatCurrency(shipment.rate)}</p>
                                </div>
                                <div className='additional-info info state'>
                                    <h6>Broker</h6>
                                    <p>{shipment.broker}</p>
                                </div>
                            </div>
                            <div className='additional-info change-status'>
                                <div className='additional-info info'>
                                    {
                                        (shipment.status !== 'un-assigned' && !this.state.completedShipment)
                                        &&
                                        this.renderUpdateLoadStatusBox(shipment)
                                    }
                                    {
                                        shipment.status === 'un-assigned' &&
                                        <div className='shipment-status'>
                                            <h6>Status</h6>
                                            <span>No Driver Assigned</span>
                                        </div>
                                    }
                                    {
                                        this.state.completedShipment &&
                                        <div className='shipment-status'>
                                            <h6>Status</h6>
                                            <span>Shipment Delivered</span>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        shipment.status !== 'un-assigned'
                            ?
                            <div className='driver-info box-style'>
                                <h3>Driver Info</h3>
                                <div className='flex-row'>

                                    <div className='additional-info info-wrapper'>
                                        <div className='additional-info info'>
                                            <h6>Driver</h6>
                                            <p>{shipment.driver.full_name}</p>
                                        </div>
                                        <div className='additional-info info city'>
                                            <h6>Pay per Mile</h6>
                                            <p>{formatCurrency(shipment.driver.pay_rate)}</p>
                                        </div>
                                        <div className='additional-info info'>
                                            <h6>Equipment #</h6>
                                            <p>{shipment.equipment.unit_num}</p>
                                        </div>
                                    </div>
                                    <div className='additional-info info-wrapper'>
                                        <div className='additional-info info state'>
                                            <h6>Drvier Payout</h6>
                                            <p className='red-text'>{formatCurrency(driverPayout)}</p>
                                        </div>
                                        <div className='additional-info info'>
                                            <h6>Load Balance Amount <br />
                                                ( rate - driver payout )
                                            </h6>
                                            <p className='green-text'>{formatCurrency(shipment.rate - driverPayout)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className='driver-info box-style'>
                                <h3>Assign Driver</h3>
                                <div className='assign-driver'>
                                    <form className='assign-driver-form' onSubmit={(e) => { this.handleAssignDriver(e) }}>
                                        <fieldset>
                                            <div className='assign-driver-fields blue-text'>
                                                <h6>Available Drivers</h6>
                                                <DriversDropDown
                                                    drivers={this.state.avaialableDrivers}
                                                    defaultValue={this.state.driverAssigned}
                                                    handleChange={(id) => { this.onDriverDropDownChange(id) }}
                                                />
                                                {
                                                    this.state.driverAssigned === -1
                                                        ?
                                                        <button className='app-button' type='submit' disabled>Assign</button>
                                                        :
                                                        <button className='app-button' type='submit'>Assign</button>
                                                }

                                            </div>
                                        </fieldset>
                                    </form>
                                </div>
                            </div>
                    }
                </section>
                :
                <></>
        );
    }
}

export default LoadByIdPage;