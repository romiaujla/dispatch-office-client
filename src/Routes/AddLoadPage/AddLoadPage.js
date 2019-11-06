import React, { Component } from 'react';
import './AddLoadPage.css';
import {
    handleGoBack,
    routeUserTo,
    formatDate,
    getAvailableDrivers,
} from '../../HelperFunctions/HelperFunctions';
import {
    notValidDate,
    emptySpaces,
} from '../../HelperFunctions/InputFieldValidations';
import DriversDropDown from '../../Components/DriversDropDown/DriversDropDown';
import AppContext from '../../Contexts/AppContext';
import config from '../../config';
import ShipmentsSerivce from '../../Services/ShipmentsService';

class AddLoadPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            availableDrivers: [],
            error: {
                dateError: 'Enter Date in correct format "MM/DD/YYYY"',
                pickupDate: false,
                deliveryDate: false,
                cityError: 'City is required',
                pickupCity: false,
                deliveryCity: false,
                stateError: 'State is required and must be two characters, Eg. for New York - NY',
                pickupState: false,
                deliveryState: false,
                zipcodeError: 'Zipcode is required',
                pickupZipcode: false,
                deliveryZipcode: false,
            },
            pickupDate: formatDate(new Date()),
            deliveryDate: formatDate(new Date()),
            pickupCity: '',
            deliveryCity: '',
            pickupState: '',
            deliveryState: '',
            pickupZipcode: '',
            deliveryZipcode: '',
            miles: '',
            rate: '',
            broker: '',
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


        if (emptySpaces(state) || state.trim().length !== 2) {
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

    updateIdleDriverQueue = (driverId) => {
        let { idleDrivers } = this.context;
        idleDrivers = idleDrivers.filter(driver => driver.id !== driverId);
        this.context.setIdleDrivers(idleDrivers)
    }

    handleAddLoad = async (e) => {

        e.preventDefault();

        const broker = e.target['broker'].value.trim() || '';
        const delivery_warehouse = {
            city: e.target['delivery-city'].value.trim(),
            state: e.target['delivery-state'].value.toUpperCase(),
            zipcode: e.target['delivery-zipcode'].value.trim()
        };
        const pickup_warehouse = {
            city: e.target['pickup-city'].value.trim(),
            state: e.target['pickup-state'].value.toUpperCase(),
            zipcode: e.target['pickup-zipcode'].value.trim()
        };
        const miles = e.target['miles'].value.trim() || 0;
        const rate = e.target['rate'].value.trim() || 0;
        const driverId = parseInt(e.target['driver'].value, 10);

        // getting driver and equipment from drivers array in context
        let driver = {}
        let equipment = {}
        let status = 'un-assigned';
        if (driverId !== -1) {
            this.context.drivers.map(contextDriver => {
                if (contextDriver.id === driverId) {
                    driver = {
                        id: driverId,
                        full_name: contextDriver.full_name,
                        pay_rate: contextDriver.pay_rate,
                        status: contextDriver.status
                    }
                    equipment = {
                        id: contextDriver.equipment.id,
                        status: contextDriver.equipment.status,
                        unit_num: contextDriver.equipment.unit_num
                    }
                }
                return contextDriver
            });
            this.updateIdleDriverQueue(driverId);
            status = 'dispatched'
        }

        const pickup_date = e.target['pickup-date'].value;
        const delivery_date = e.target['delivery-date'].value;

        // the shipment to store in the database
        let shipmentInDB = {
            rate,
            status,
            miles,
            driver_id: driverId !== -1 ? driverId : null,
            broker,
            pickup_date,
            delivery_date,
            pickup_city: pickup_warehouse.city,
            pickup_state: pickup_warehouse.state,
            pickup_zipcode: pickup_warehouse.zipcode,
            delivery_city: delivery_warehouse.city,
            delivery_state: delivery_warehouse.state,
            delivery_zipcode: delivery_warehouse.zipcode
        }
        // add and get the new shipment with the id
        shipmentInDB = await ShipmentsSerivce.insertShipment(shipmentInDB)

        // shipment in the format for the front end to display it correctly
        // and keep all arrays in order.
        const newShipment = {
            id: shipmentInDB.id,
            pickup_date,
            delivery_date,
            broker,
            delivery_warehouse,
            pickup_warehouse,
            miles,
            driver,
            equipment,
            rate,
            status,
        }

        this.context.setShipments([
            ...this.context.shipments,
            newShipment
        ])

        // handleGoBack(this.props.history);
        routeUserTo(this.props.history, `${config.BASEPATH}/load/${newShipment.id}`)

    }

    render() {
        const availableDrivers = getAvailableDrivers(this.context.idleDrivers)
        const { error } = this.state

        return (
            <section className='AddLoadPage width-wrapper'>
                <form className='add-load-form' onSubmit={(e) => { this.handleAddLoad(e) }}>
                    <fieldset>
                        <legend className='blue-back white-text'>
                            <button type='button' className='app-button go-back' onClick={(e) => { handleGoBack(this.props.history) }}>
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
                                />
                            </label>
                            <label htmlFor='driver'>
                                <span className='input-title'>Assign Driver</span>
                                <DriversDropDown name='driver' id='driver' drivers={availableDrivers} className='select-css' />
                                {
                                    // incorrectPassword &&
                                    // <span className='error'>{error}</span>
                                }
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
                                        Add New Load
                                    </button>
                                    :
                                    <button
                                        className='app-button'
                                        type='submit'
                                        disabled
                                    >
                                        Add New Load
                                    </button>
                            }

                        </div>
                    </fieldset>
                </form>
            </section>
        );
    }
}

export default AddLoadPage;