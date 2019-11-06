import React, { Component } from 'react';
import './AddDriverPage.css';
import {
    handleGoBack,
    routeUserTo,
    renderEquipmentOptions,
} from '../../HelperFunctions/HelperFunctions';
import AppContext from '../../Contexts/AppContext';
import config from '../../config';
import { isNotValidDriverName, isNotValidPay } from '../../HelperFunctions/InputFieldValidations';
import DriversService from '../../Services/DriversService';

class AddDriverPage extends Component {

    static defaultProps = {
        rprops: {},
        equipments: [],
    }

    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            availableEquipments: [],
            error: {
                driverNameError: 'Driver name is required',
                driverName: false,
                driverPayError: 'Driver pay cannot have characters in it',
                driverPay: false,
            },
            full_name: '',
            pay_rate: 0.0,
            equipment_id: -1,
        }
    }

    static contextType = AppContext

    validateDriverName = (full_name) => {
        const isNotValid = isNotValidDriverName(full_name)
        this.setState({
            full_name
        })
        if(isNotValid){
            this.setState({
                error: {
                    ...this.state.error,
                    driverName: true,
                    driverNameError: isNotValid
                }
            })
        }else{
            this.setState({
                error: {
                    ...this.state.error,
                    driverName: false,
                    driverNameError: ''
                }
            })
        }
    }

    validatePayRate = (pay_rate) => {
        const isNotValid = isNotValidPay(pay_rate)
        this.setState({
            pay_rate
        })
        if(isNotValid){
            this.setState({
                error: {
                    ...this.state.error,
                    driverPay: true,
                    driverPayError: isNotValid
                }
            })
        }else{
            this.setState({
                error: {
                    ...this.state.error,
                    driverPay: false,
                    driverPayError: ''
                }
            })
        }
    }

    updateIdleDriverQueue = (driver) => {
        let { idleDrivers } = this.context;
        idleDrivers = [
            ...idleDrivers,
            driver
        ]
        this.context.setIdleDrivers(idleDrivers)
    }

    handleAddDriver = async (e) => {

        e.preventDefault();
        const full_name = e.target['full_name'].value;
        const pay_rate = e.target['pay_rate'].value;
        let equipment_id = parseInt(e.target['equipment_id'].value, 10);

        let dbDriver = {
            full_name,
            pay_rate,
            equipment_id: equipment_id !== -1 ? equipment_id : null
        }

        dbDriver = await DriversService.addDriver(dbDriver)

        let {drivers, idleDrivers, equipments} = this.context

        let driver = {
            id: dbDriver.id,
            full_name,
            pay_rate,
            status: 'active'
        }
        
        let equipment = {}
        if(equipment_id !== -1){

            equipments = equipments.map((contextEquipment) => {
                if(contextEquipment.id === equipment_id){
                    contextEquipment.driver = driver
                    equipment = {
                        id: contextEquipment.id,
                        unit_num: contextEquipment.unit_num,
                        status: contextEquipment.status
                    }
                }
                return contextEquipment
            });
        }

        driver = {
            ...driver,
            equipment
        }

        // add new driver to all the drivers
        drivers = [
            ...drivers,
            driver
        ]

        // adding new driver to the idle driver queue
        idleDrivers = [
            ...idleDrivers,
            driver
        ]

        this.context.setDrivers(drivers);
        this.context.setIdleDrivers(idleDrivers);
        this.context.setEquipments(equipments);

        routeUserTo(this.props.rprops.history, `${config.BASEPATH}/drivers`)
    }

    render() {

        const { error } = this.state
        const availableEquipments = this.props.equipments.filter((equipment) => !equipment.driver.hasOwnProperty('id') && equipment.status === 'active')

        return (
            <section className='AddDriverPage width-wrapper'>
                <form className='add-load-form' onSubmit={(e) => { this.handleAddDriver(e) }}>
                    <fieldset>
                        <legend className='blue-back white-text'>
                            <button type='button' className='app-button go-back' onClick={(e) => { handleGoBack(this.props.rprops.history) }}>
                                Go Back
                            </button>
                            <span>Add Driver</span>
                        </legend>
                        <div className='flex'>
                            <label htmlFor='full_name'>
                                <span className='input-title'>* driver name</span>
                                <input
                                    type='text'
                                    id='full_name'
                                    name='full_name'
                                    placeholder='Eg. John Doe'
                                    value={this.state.full_name}
                                    onChange={(e) => { this.validateDriverName(e.target.value) }}
                                    required
                                />
                                {
                                    error.driverName &&
                                    <span className='error'>{error.driverNameError}</span>
                                }
                            </label>
                            <label htmlFor='pay_rate'>
                                <span className='input-title'>salary Per mile</span>
                                <input
                                    type='text'
                                    id='pay_rate'
                                    name='pay_rate'
                                    min='0'
                                    placeholder='Eg. 0.43'
                                    value={this.state.pay_rate}
                                    onChange={(e) => { this.validatePayRate(e.target.value) }}
                                    onBlur={(e) => {
                                        if(e.target.value.trim() === ''){
                                            this.setState({
                                                pay_rate: 0.0,
                                                error: {
                                                    ...this.state.error,
                                                    driverPay: false,
                                                    driverPayError: ''
                                                }
                                            })
                                        }
                                    }}
                                />
                                {
                                    error.driverPay &&
                                    <span className='error'>{error.driverPayError}</span>
                                }
                            </label>
                            <label htmlFor='delivery-zipcode'>
                                <span className='input-title'>Available Equipments</span>
                                <select className='select-css' 
                                    name='equipment_id' 
                                    id='equipment_id'
                                    value={this.state.equipment_id}
                                    onChange={(e) => {this.setState({equipment_id: e.target.value})}}
                                >
                                    <option value='-1'>No Equipment</option>
                                    {renderEquipmentOptions(availableEquipments)}
                                </select>
                                {
                                    this.state.error.deliveryZipcode &&
                                    <span className='error'>{this.state.error.zipcodeError}</span>
                                }
                            </label>
                            {
                                !(
                                    error.driverName ||
                                    error.driverPay
                                )
                                    ?
                                    <button
                                        className='app-button'
                                        type='submit'
                                    >
                                        Add New Driver
                                    </button>
                                    :
                                    <button
                                        className='app-button'
                                        type='submit'
                                        disabled
                                    >
                                        Add New Driver
                                    </button>
                            }

                        </div>
                    </fieldset>
                </form>
            </section>
        );
    }
}

export default AddDriverPage;