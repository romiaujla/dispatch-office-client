import React, { Component } from 'react';
import './LoadByIdPage.css';
import AppContext from '../../Contexts/AppContext';
import { arrayIsEmpty, objectIsEmpty, renderLoadStatusOptions } from '../../HelperFunctions/HelperFunctions';

class LoadByIdPage extends Component {

    static defaultProps = {
        rprops: {},
        shipments: []
    }

    constructor(props) {
        super(props);

        const id = parseInt(this.props.rprops.match.params.id, 10)
        const { shipments } = this.props;
        let shipment = {};
        let status = '';
        if (!arrayIsEmpty(shipments)) {
            shipment = shipments.filter(shipment => shipment.id === id)[0];
            status = shipment.status
        }
        console.log(status);
        this.state = {
            shipment,
            status,
        }
    }

    // remove drivers when status is changed to un-assigned
    removeDriverAndEquipmentFromShipment = (shipment) => {
        shipment.driver = {}
        shipment.equipment = {}
        return shipment;
    }

    handleChangeLoadStatus = (e) => {
        e.preventDefault();
        
        const {status} = this.state;
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
                    if(status === 'un-assigned'){
                        propShipment = this.removeDriverAndEquipmentFromShipment(propShipment);
                    }
                }
                return propShipment
            })
            this.context.setShipments(shipments);
        })

    }

    static contextType = AppContext

    render() {

        const { shipment } = this.state

        return (
            !objectIsEmpty(shipment) ?
                <section className='LoadByIdPage width-wrapper'>
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
                                    <p className='red-text'>${shipment.rate}</p>
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
                                            <legend><h6>Status</h6></legend>
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
                                            <p>${shipment.driver.pay_rate}</p>
                                        </div>
                                    </div>
                                    <div className='additional-info info-wrapper'>
                                        <div className='additional-info info state'>
                                            <h6>Drvier Payout</h6>
                                            <p className='red-text'>${shipment.driver.pay_rate * shipment.miles}</p>
                                        </div>
                                        <div className='additional-info info'>
                                            <h6>Equipment #</h6>
                                            <p>{shipment.equipment.unit_num}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className='driver-info box-style'>
                                <h3>Assign Driver</h3>
                                <div className='assign-driver'>
                                    Assign Driver Section
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