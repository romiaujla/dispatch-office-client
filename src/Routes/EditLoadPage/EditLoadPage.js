import React, { Component } from 'react';
import './EditLoadPage.css';
import {
    handleGoBack,
    routeUserTo,
    formatDate,
    arrayIsEmpty,
} from '../../HelperFunctions/HelperFunctions';
import {
    notValidDate,
    emptySpaces,
} from '../../HelperFunctions/InputFieldValidations';
import AppContext from '../../Contexts/AppContext';
import config from '../../config';

class EditLoadPage extends Component {

    constructor(props) {
        super(props);

        const id = parseInt(props.rprops.match.params.id, 10);
        const {shipments} = this.props;
        let shipment = {};
        let pickup_warehouse = {};
        let delivery_warehouse = {};
        let driver = {};
        if(!arrayIsEmpty(shipments)){
            shipment = props.shipments.filter((shipment) => shipment.id === id)[0];
            pickup_warehouse = shipment.pickup_warehouse;
            delivery_warehouse = shipment.delivery_warehouse;
            driver = shipment.driver
        }



        this.state = {
            shipmentId: id,
            availableDrivers: [],
            error: {
                dateError: 'Enter Date in correct format "MM/DD/YYYY"',
                pickupDate: false,
                deliveryDate: false,
                cityError: 'City is required',
                pickupCity: false,
                deliveryCity: false,
                stateError: 'State is required',
                pickupState: false,
                deliveryState: false,
                zipcodeError: 'Zipcode is required',
                pickupZipcode: false,
                deliveryZipcode: false,
            },
            pickupDate: formatDate(shipment.pickup_date),
            deliveryDate: formatDate(shipment.delivery_date),
            pickupCity: pickup_warehouse.city,
            deliveryCity: delivery_warehouse.city,
            pickupState: pickup_warehouse.state,
            deliveryState: delivery_warehouse.state,
            pickupZipcode: pickup_warehouse.zipcode,
            deliveryZipcode: delivery_warehouse.zipcode,
            miles: shipment.miles,
            rate: shipment.rate,
            broker: shipment.broker || '',
            driverId: driver.id
        }
    }

    static contextType = AppContext

    // validation of date, Validates both pickup date and delivery date
    // *** THIS FUNCTION IS DEPENDENT ON THE NAME PROPERTY OF THE INPUT BOXES ***
    validateInputDate = (e) => {
        const date = e.target.value;
        const { name } = e.target;

        name === 'pickup-date'
            ? this.setState({ pickupDate: date })
            : this.setState({ deliveryDate: date });

        if (notValidDate(date)) {
            name === 'pickup-date'
                ? this.setState({
                    error: {
                        ...this.state.error,
                        pickupDate: true,
                    }
                })
                : this.setState({
                    error: {
                        ...this.state.error,
                        deliveryDate: true,
                    }
                });
        } else {
            name === 'pickup-date'
                ? this.setState({
                    error: {
                        ...this.state.error,
                        pickupDate: false,
                    }
                })
                : this.setState({
                    error: {
                        ...this.state.error,
                        deliveryDate: false,
                    }
                });
        }
    }

    validateCityInput = (e) => {
        const city = e.target.value;
        const { name } = e.target;

        name === 'pickup-city'
            ? this.setState({ pickupCity: city })
            : this.setState({ deliveryCity: city });


        if (emptySpaces(city)) {
            name === 'pickup-city'
                ? this.setState({
                    error: {
                        ...this.state.error,
                        pickupCity: true,
                    }
                })
                : this.setState({
                    error: {
                        ...this.state.error,
                        deliveryCity: true,
                    }
                });
        } else {
            name === 'pickup-city'
                ? this.setState({
                    error: {
                        ...this.state.error,
                        pickupCity: false,
                    }
                })
                : this.setState({
                    error: {
                        ...this.state.error,
                        deliveryCity: false,
                    }
                });
        }
    }

    validateStateInput = (e) => {
        const state = e.target.value;
        const { name } = e.target;

        name === 'pickup-state'
            ? this.setState({ pickupState: state })
            : this.setState({ deliveryState: state });


        if (emptySpaces(state)) {
            name === 'pickup-state'
                ? this.setState({
                    error: {
                        ...this.state.error,
                        pickupState: true,
                    }
                })
                : this.setState({
                    error: {
                        ...this.state.error,
                        deliveryState: true,
                    }
                });
        } else {
            name === 'pickup-state'
                ? this.setState({
                    error: {
                        ...this.state.error,
                        pickupState: false,
                    }
                })
                : this.setState({
                    error: {
                        ...this.state.error,
                        deliveryState: false,
                    }
                });
        }
    }

    validateZipcodeInput = (e) => {
        const zipcode = e.target.value;
        const { name } = e.target;

        name === 'pickup-zipcode'
            ? this.setState({ pickupZipcode: zipcode })
            : this.setState({ deliveryZipcode: zipcode });


        if (emptySpaces(zipcode)) {
            name === 'pickup-zipcode'
                ? this.setState({
                    error: {
                        ...this.state.error,
                        pickupZipcode: true,
                    }
                })
                : this.setState({
                    error: {
                        ...this.state.error,
                        deliveryZipcode: true,
                    }
                });
        } else {
            name === 'pickup-zipcode'
                ? this.setState({
                    error: {
                        ...this.state.error,
                        pickupZipcode: false,
                    }
                })
                : this.setState({
                    error: {
                        ...this.state.error,
                        deliveryZipcode: false,
                    }
                });
        }
    }

    handleEditLoad = (e) => {

        e.preventDefault();

        const { shipmentId } = this.state;
        const broker = e.target['broker'].value.trim() || '';
        const delivery_warehouse = {
            city: e.target['delivery-city'].value.trim(),
            state: e.target['delivery-state'].value,
            zipcode: e.target['delivery-zipcode'].value.trim()
        };
        const pickup_warehouse = {
            city: e.target['pickup-city'].value.trim(),
            state: e.target['pickup-state'].value,
            zipcode: e.target['pickup-zipcode'].value.trim()
        };
        const miles = e.target['miles'].value.trim() || '0';
        const rate = e.target['rate'].value.trim() || '0'
        const pickup_date = e.target['pickup-date'].value;
        const delivery_date = e.target['delivery-date'].value;

        const newShipmentFields = {
            pickup_date,
            pickup_warehouse,
            delivery_date,
            delivery_warehouse,
            miles,
            rate,
            broker
        }

        let {shipments} = this.context
        shipments = shipments.map((shipment) => {
            if(shipment.id === shipmentId){
                shipment = {
                    ...shipment,
                    ...newShipmentFields,
                }
            }
            return shipment;
        })

        this.context.setShipments(shipments);
        routeUserTo(this.props.rprops.history, `${config.BASEPATH}/load/${shipmentId}`)

    }

    render() {        
        const { error } = this.state

        return (
            <section className='EditLoadPage width-wrapper'>
                <form className='add-load-form' onSubmit={(e) => { this.handleEditLoad(e) }}>
                    <fieldset>
                        <legend className='blue-back white-text'>
                            <button type='button' className='app-button go-back' onClick={(e) => { handleGoBack(this.props.rprops.history) }}>
                                Go Back
                            </button>
                            <span>Add Load</span>
                        </legend>
                        <div className='flex'>
                            <h4 className='fieldset-sub-title blue-text'>
                                Pick Up Info
                            </h4>
                            <label htmlFor='pickup-date'>
                                <span className='input-title'>* Date</span>
                                <input
                                    type='text'
                                    id='pickup-date'
                                    name='pickup-date'
                                    maxLength='10'
                                    value={this.state.pickupDate}
                                    onChange={(e) => { this.validateInputDate(e) }}
                                    onBlur={(e) => {
                                        if (e.target.value === '') {
                                            this.setState({
                                                pickupDate: formatDate(new Date()),
                                                error: {
                                                    ...this.state.error,
                                                    pickupDate: false
                                                }
                                            })
                                        }
                                    }}
                                />
                                {
                                    error.pickupDate &&
                                    <span className='error'>{error.dateError}</span>
                                }
                            </label>
                            <label htmlFor='pickup-city'>
                                <span className='input-title'>* City</span>
                                <input
                                    type='text'
                                    id='pickup-city'
                                    name='pickup-city'
                                    placeholder='Eg. Dallas'
                                    required
                                    value={this.state.pickupCity}
                                    onChange={(e) => { this.validateCityInput(e) }}
                                />
                                {
                                    error.pickupCity &&
                                    <span className='error'>{error.cityError}</span>
                                }
                            </label>
                            <label htmlFor='pickup-state'>
                                <span className='input-title'>* State</span>
                                <input
                                    type='text'
                                    placeholder='Eg. TX'
                                    maxLength='2'
                                    id='pickup-state'
                                    name='pickup-state'
                                    required
                                    value={this.state.pickupState}
                                    onChange={(e) => { this.validateStateInput(e) }}
                                />
                                {
                                    this.state.error.pickupState &&
                                    <span className='error'>{this.state.error.stateError}</span>
                                }
                            </label>
                            <label htmlFor='pickup-zipcode'>
                                <span className='input-title'>* Zipcode</span>
                                <input
                                    type='text'
                                    id='pickup-zipcode'
                                    maxLength='10'
                                    name='pickup-zipcode'
                                    placeholder='Eg. 75001'
                                    required
                                    value={this.state.pickupZipcode}
                                    onChange={(e) => { this.validateZipcodeInput(e) }}
                                />
                                {
                                    this.state.error.pickupZipcode &&
                                    <span className='error'>{this.state.error.zipcodeError}</span>
                                }
                            </label>
                            <h4 className='fieldset-sub-title blue-text'>
                                Delivery Info
                            </h4>
                            <label htmlFor='delivery-date'>
                                <span className='input-title'>* Date</span>
                                <input
                                    type='text'
                                    id='delivery-date'
                                    name='delivery-date'
                                    maxLength='10'
                                    value={this.state.deliveryDate}
                                    onChange={(e) => { this.validateInputDate(e) }}
                                    onBlur={(e) => {
                                        if (e.target.value === '') {
                                            this.setState({
                                                deliveryDate: formatDate(new Date()),
                                                error: {
                                                    ...this.state.error,
                                                    deliveryDate: false
                                                }
                                            })
                                        }
                                    }}
                                />
                                {
                                    this.state.error.deliveryDate &&
                                    <span className='error'>{this.state.error.dateError}</span>
                                }
                            </label>
                            <label htmlFor='delivery-city'>
                                <span className='input-title'>* City</span>
                                <input
                                    type='text'
                                    id='delivery-city'
                                    name='delivery-city'
                                    placeholder='Eg. Indianapolis'
                                    required
                                    value={this.state.deliveryCity}
                                    onChange={(e) => { this.validateCityInput(e) }}
                                />
                                {
                                    this.state.error.deliveryCity &&
                                    <span className='error'>{this.state.error.cityError}</span>
                                }
                            </label>
                            <label htmlFor='delivery-state'>
                                <span className='input-title'>* State</span>
                                <input
                                    type='text'
                                    placeholder='Eg. IN'
                                    maxLength='2'
                                    id='delivery-state'
                                    name='delivery-state'
                                    required
                                    value={this.state.deliveryState}
                                    onChange={(e) => { this.validateStateInput(e) }}
                                />
                                {
                                    this.state.error.deliveryState &&
                                    <span className='error'>{this.state.error.stateError}</span>
                                }
                            </label>
                            <label htmlFor='delivery-zipcode'>
                                <span className='input-title'>* Zipcode</span>
                                <input
                                    type='text'
                                    id='delivery-zipcode'
                                    name='delivery-zipcode'
                                    maxLength='10'
                                    placeholder='Eg. 46225'
                                    required
                                    value={this.state.deliveryZipcode}
                                    onChange={(e) => { this.validateZipcodeInput(e) }}
                                />
                                {
                                    this.state.error.deliveryZipcode &&
                                    <span className='error'>{this.state.error.zipcodeError}</span>
                                }
                            </label>
                            <h4 className='fieldset-sub-title blue-text'>
                                Additional Info
                            </h4>
                            <label htmlFor='miles'>
                                <span className='input-title'>Miles</span>
                                <input
                                    type='number'
                                    min='0'
                                    id='miles'
                                    name='miles'
                                    value={this.state.miles}
                                    onChange={(e) => {this.setState({miles: e.target.value})}}
                                />
                                {
                                    // this.state.unitNumError &&
                                    // <span className='error'>{this.state.error}</span>
                                }
                            </label>
                            <label htmlFor='rate'>
                                <span className='input-title'>Rate</span>
                                <input
                                    type='number'
                                    min='0'
                                    id='rate'
                                    name='rate'
                                    value={this.state.rate}
                                    onChange={(e) => {this.setState({rate: e.target.value})}}
                                />
                                {
                                    // this.state.unitNumError &&
                                    // <span className='error'>{this.state.error}</span>
                                }
                            </label>
                            <label htmlFor='broker'>
                                <span className='input-title'>Broker</span>
                                <input
                                    type='text'
                                    id='broker'
                                    name='broker'
                                    value={this.state.broker}
                                    onChange={(e) => {this.setState({broker: e.target.value})}}
                                />
                            </label>
                            {
                                !(
                                    error.pickupCity ||
                                    error.deliveryCity ||
                                    error.pickupDate ||
                                    error.deliveryDate ||
                                    error.pickupState ||
                                    error.deliveryState ||
                                    error.pickupZipcode ||
                                    error.deliveryZipcode
                                )
                                    ?
                                    <button
                                        className='app-button'
                                        type='submit'
                                    >
                                        Edit Load
                                    </button>
                                    :
                                    <button
                                        className='app-button'
                                        type='submit'
                                        disabled
                                    >
                                        Edit Load
                                    </button>
                            }

                        </div>
                    </fieldset>
                </form>
            </section>
        );
    }
}

export default EditLoadPage;