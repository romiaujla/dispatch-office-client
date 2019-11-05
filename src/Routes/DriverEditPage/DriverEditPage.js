import React, { Component } from 'react';
import './DriverEditPage.css';
import AppContext from '../../Contexts/AppContext';
import {
    handleGoBack,
    objectIsEmpty,
    renderEquipmentOptions,
} from '../../HelperFunctions/HelperFunctions';
import { isNotValidDriverName, isNotValidPay } from '../../HelperFunctions/InputFieldValidations';

class DriverEditPage extends Component {

    static defaultProps = {
        equipments: {},
        idleDrivers: {},
        rprops: {},
    }

    constructor(props) {
        super(props);

        // setting state so that edit equipment page
        // already has values in it for the selected equipment to edit
        // if not done this way , then another Get request had to be made for
        // getting equipment by id 
        let full_name = '';
        let pay_rate= '';
        let equipment_id = -1;
        const driver_id = parseInt(this.props.rprops.match.params.id, 10)
        let driver = this.props.drivers.filter((driver) => driver.id === driver_id)[0] || {};
        
        if(!objectIsEmpty(driver)){
            full_name = driver.full_name;
            pay_rate = driver.pay_rate;
            equipment_id = !objectIsEmpty(driver.equipment) ? driver.equipment.id : -1;
        }

        let availableEquipments = [];
        availableEquipments = this.props.equipments.filter((equipment) => !equipment.driver.hasOwnProperty('id') && equipment.status === 'active')
        if(equipment_id !== -1){
            const currentEquipment = this.props.equipments.filter((propsEquipment) => propsEquipment.id === equipment_id)[0]
            availableEquipments = [
                currentEquipment,
                ...availableEquipments
            ]
            // console.log(currentEquipment);
        }

        this.state = {
            error: {
                driverNameError: '',
                driverName: false,
                driverPayError: '',
                driverPay: false,
            },
            availableEquipments,
            driver,
            full_name,
            pay_rate,
            equipment_id,
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

    changeEquipment = (drivers, driverToChange, equipment) => {
        const driversArray = drivers.map((driver) => {
            if(driver.id === driverToChange.id){
                driver.equipment = equipment
            }
            return driver
        }) 
        return driversArray;
    }

    makeDriverChanges = (drivers, driverToChange, changes) => {
        const driversArray = drivers.map((driver) => {
            if(driver.id === driverToChange.id){
                driver = {
                    ...driver,
                    full_name: changes.full_name,
                    pay_rate: changes.pay_rate
                }
            }
            return driver;
        })
        return driversArray;
    }

    handleEditDriver = (e, changeDriver) => {

        e.preventDefault();

        const full_name = e.target['full_name'].value
        const pay_rate = e.target['pay_rate'].value
        const newEquipmentId = parseInt(e.target['equipment_id'].value)
        const oldEquipmentId = !objectIsEmpty(changeDriver.equipment) ? changeDriver.equipment.id : -1;

        let {drivers, idleDrivers, equipments} = this.context

        if(newEquipmentId !== oldEquipmentId){

            let newEquipment = newEquipmentId !== -1 ? equipments.filter((equipment) => equipment.id === newEquipmentId)[0] : {};
            newEquipment = !objectIsEmpty(newEquipment) 
                ?
                {
                    id: newEquipment.id,
                    unit_num: newEquipment.unit_num,
                    status: 'active'
                } 
                : {}
            
            drivers = this.changeEquipment(drivers, changeDriver, newEquipment)
            idleDrivers = this.changeEquipment(idleDrivers, changeDriver, newEquipment)

            // remove driver from old equipment if id not -1
            if(oldEquipmentId !== -1){
                equipments = equipments.map((equipment) => {
                    if(equipment.id === oldEquipmentId){
                        equipment.driver = {}
                    }
                    return equipment
                })
            }

            equipments = equipments.map((equipment) => {
                if(equipment.id === newEquipmentId){
                    equipment.driver = {
                        id: changeDriver.id,
                        full_name,
                        pay_rate,
                        status: 'active'
                    }
                }
                return equipment
            })

        }
        
        const changes = {
            full_name,
            pay_rate
        }
        // make changes to the changed driver in all drivers array
        drivers = this.makeDriverChanges(drivers, changeDriver, changes)
        idleDrivers = this.makeDriverChanges(idleDrivers, changeDriver, changes)

        this.context.setDrivers(drivers);
        this.context.setEquipments(equipments);
        this.context.setIdleDrivers(idleDrivers);

        console.log(`idleEquipments:`, this.context.idleEquipments);
    }

    render() {

        
        const {full_name, pay_rate, equipment_id, driver, availableEquipments, error} = this.state;
        

        return (
            <section className='DriverEditPage width-wrapper'>

                <form className='edit-equip' onSubmit={(e) => { this.handleEditDriver(e, driver) }}>
                    <fieldset>
                        <legend className='blue-back white-text'>
                            <button type='button' className='app-button go-back' onClick={(e) => { handleGoBack(this.props.rprops.history) }}>
                                Go Back
                            </button>
                            <span>Edit Driver</span>
                        </legend>
                        <div className='flex'>
                            <label htmlFor='full_name'>
                                <span className='input-title'>Name</span>
                                <input
                                    type='text'
                                    id='full_name'
                                    name='full_name'
                                    required
                                    value={full_name}
                                    onChange={(e) => { this.validateDriverName(e.target.value)}}
                                />
                                {
                                    error.driverName &&
                                    <span className='error'>{error.driverNameError}</span>
                                }
                            </label>
                            <label htmlFor='pay_rate'>
                                <span className='input-title'>Pay Rate</span>
                                <input
                                    type='text'
                                    id='pay_rate'
                                    name='pay_rate'
                                    required
                                    value={pay_rate}
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
                            <label htmlFor='driver'>
                                <span className='input-title'>Available Equipment</span>
                                <select 
                                    className='select-css' 
                                    value={equipment_id}
                                    name='equipmen_id'
                                    id='equipment_id'
                                    onChange={(e) => {this.setState({equipment_id: e.target.value})}}>
                                        <option value='-1'>No Equipment</option>
                                        {renderEquipmentOptions(availableEquipments)}
                                </select>
                            </label>
                            {
                                error.driverPay ||
                                error.driverName
                                    ?
                                    <button
                                        className='app-button'
                                        type='submit'
                                        disabled
                                    >
                                        Save Changes
                                    </button>
                                    :
                                    <button
                                        className='app-button'
                                        type='submit'
                                    >
                                        Save Changes
                                    </button>
                            }
                        </div>
                    </fieldset>
                </form>
            </section>
        );
    }
}

export default DriverEditPage;