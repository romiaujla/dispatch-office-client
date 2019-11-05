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
    routeUserTo
} from '../../HelperFunctions/HelperFunctions';
import DriversDropDown from '../../Components/DriversDropDown/DriversDropDown';
import config from '../../config';
import {Link} from 'react-router-dom';

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
            driverAssigned
        }
    }

    // remove drivers when status is changed to un-assigned
    removeDriverAndEquipmentFromShipment = (shipment) => {

        let { idleDrivers } = this.context
        const driver = {
            ...shipment.driver,
            pay_rate: shipment.driver.pay_rate.toString(), // converting to string to make sure all objects are of the same data type
            equipment: shipment.equipment
        }

        this.context.setIdleDrivers([
            ...idleDrivers,
            driver
        ])

        shipment.driver = {}
        shipment.equipment = {}

        return shipment;
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
            shipments = shipments.map((propShipment) => {
                if (propShipment.id === shipment.id) {
                    propShipment.status = status
                    if (status === 'un-assigned') {
                        propShipment = this.removeDriverAndEquipmentFromShipment(propShipment);
                    }
                    if(status === 'completed'){
                        
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

        idleDrivers = idleDrivers.filter((idleDriver) => {
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
                return;
            } else {
                return idleDriver;
            }
        });

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

        this.context.setIdleDrivers(idleDrivers);
        this.context.setShipments(shipments);
        routeUserTo(this.props.rprops.history, '/');

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
                        <Link className='app-button' to={`${config.BASEPATH}/load/edit/${shipment.id}`}>
                            Go Back
                        </Link>
                        <Link className='app-button edit-button' to={`${config.BASEPATH}/load/edit/${shipment.id}`}>
                            Edit
                        </Link>
                        <a className='app-button' onClick={() => {this.handleShipmentDelete(shipment.id)}}>
                            Delete
                        </a>
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
                                    <form onSubmit={(e) => { this.handleChangeLoadStatus(e) }}>
                                        <fieldset>
                                            <legend><h6><label htmlFor='status'>Status</label></h6></legend>
                                            {
                                                shipment.status !== 'un-assigned'
                                                    ?
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
                                                    :
                                                    <select
                                                        className='select-css'
                                                        name='status'
                                                        id='status'
                                                        disabled
                                                        defaultValue={this.state.status}
                                                    >
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