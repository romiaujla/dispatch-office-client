import React, { Component } from 'react';
import './AddLoadPage.css';
import {
    handleGoBack,
    formatDate,
    validateDate
} from '../../HelperFunctions/HelperFunctions';
import DriversDropDown from '../../Components/DriversDropDown/DriversDropDown';
import AppContext from '../../Contexts/AppContext';

class AddLoadPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: {
                dateError: 'Enter Date in correct format "MM/DD/YYYY"',
                pickupDate: false,
                deliveryDate: false,
            },
            pickupDate: formatDate(new Date()),
            deliveryDate: formatDate(new Date()),
        }
    }

    static contextType = AppContext

    // validation of date, Validates both pickup date and delivery date
    // *** THIS FUNCTION IS DEPENDENT ON THE NAME PROPERTY OF THE INPUT BOXES ***
    validateInputDate = (e) => {
        const date = e.target.value;
        const {name} = e.target;

        name === 'pickup-date' 
            ? this.setState({pickupDate: date})
            : this.setState({deliveryDate: date});        
        
        if(validateDate(date)){
            name === 'pickup-date' 
                ? this.setState({error:{
                    ...this.state.error,
                    pickupDate:true,
                }})
                : this.setState({error:{
                    ...this.state.error,
                    deliveryDate:true,
                }});
        }else{
            name === 'pickup-date' 
                ? this.setState({error:{
                    ...this.state.error,
                    pickupDate:false,
                }})
                : this.setState({error:{
                    ...this.state.error,
                    deliveryDate:false,
                }});
        }
    }

    // to populate the drivers drop down list
    // with only those drivers that are idle and 
    // have an equipment avialable to be assigned
    getAvailableDrivers = () => {
        const {idleDrivers} = this.context;
        const availableDrivers = idleDrivers.filter((driver) => !(Object.entries(driver.equipment).length === 0 && driver.equipment.constructor === Object));
        return availableDrivers;
    }

    handleAddLoad = (e) => {
        e.preventDefault();
        const broker = e.target['broker'].value || '';
        const deliveryWarehouse = {
            city: e.target['delivery-city'].value,
            state: e.target['delivery-state'].value,
            zipcode: e.target['delivery-zipcode'].value
        };
        const pickupWarehouse = {
            city: e.target['pickup-city'].value,
            state: e.target['pickup-state'].value,
            zipcode: e.target['pickup-zipcode'].value
        };
        const miles = e.target['miles'].value || 0;
        const rate = e.target['rate'].value || 0;
        const driverId = parseInt(e.target['driver'].value, 10);
        
        // getting driver and equipment from drivers array in context
        let driver = {}
        let equipment = {}
        let status = 'un-assigned';
        if(driverId !== -1){
            this.context.drivers.map(contextDriver => {
                if(contextDriver.id === driverId){
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
            });
            status = 'dispatched'
        }

        const pickup_date = new Date(e.target['pickup-date'].value);

        const newShipment = {
            id: this.context.shipments.length+3,
            pickup_date,
            broker,
            deliveryWarehouse,
            pickupWarehouse,
            miles,
            driver,
            equipment,
            rate,
            status,
        }

        console.log(newShipment);
    }

    render() {

        // to populate the drivers drop down list
        // with only those drivers that are idle and 
        // have an equipment avialable to be assigned
        const drivers = this.getAvailableDrivers();

        return (
            <section className='AddLoadPage width-wrapper'>
                <form className='add-load-form' onSubmit={(e) => {this.handleAddLoad(e)}}>
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
                                    onChange={(e) => {this.validateInputDate(e)}}
                                    onBlur={(e) => {
                                        if(e.target.value === ''){
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
                                    this.state.error.pickupDate &&
                                    <span className='error'>{this.state.error.dateError}</span>
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
                                />
                                {
                                    // this.state.unitNumError &&
                                    // <span className='error'>{this.state.error}</span>
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
                                />
                                {
                                    // this.state.unitNumError &&
                                    // <span className='error'>{this.state.error}</span>
                                }
                            </label>
                            <label htmlFor='pickup-zipcode'>
                                <span className='input-title'>* Zipcode</span>
                                <input
                                    type='text'
                                    id='pickup-zipcode'
                                    name='pickup-zipcode'
                                    placeholder='Eg. 75001'
                                    required
                                />
                                {
                                    // this.state.unitNumError &&
                                    // <span className='error'>{this.state.error}</span>
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
                                    onChange={(e) => {this.validateInputDate(e)}}
                                    onBlur={(e) => {
                                        if(e.target.value === ''){
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
                                />
                                {
                                    // this.state.unitNumError &&
                                    // <span className='error'>{this.state.error}</span>
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
                                />
                                {
                                    // this.state.unitNumError &&
                                    // <span className='error'>{this.state.error}</span>
                                }
                            </label>
                            <label htmlFor='delivery-zipcode'>
                                <span className='input-title'>* Zipcode</span>
                                <input
                                    type='text'
                                    id='delivery-zipcode'
                                    name='delivery-zipcode'
                                    placeholder='Eg. 46225'
                                    required
                                />
                                {
                                    // this.state.unitNumError &&
                                    // <span className='error'>{this.state.error}</span>
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
                                <DriversDropDown name='driver' id='driver' drivers={drivers} className='select-css' />
                                {
                                    // incorrectPassword &&
                                    // <span className='error'>{error}</span>
                                }
                            </label>
                            <button
                                className='app-button'
                                type='submit'
                            >
                                Add New Load
                                </button>
                        </div>
                    </fieldset>
                </form>
            </section>
        );
    }
}

export default AddLoadPage;