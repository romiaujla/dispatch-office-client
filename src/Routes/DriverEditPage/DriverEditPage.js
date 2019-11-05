import React, { Component } from 'react';
import './DriverEditPage.css';
import DriversDropDown from '../../Components/DriversDropDown/DriversDropDown';
import AppContext from '../../Contexts/AppContext';
import {
    handleGoBack,
    objectIsEmpty,
    arrayIsEmpty,
    renderEquipmentOptions,
} from '../../HelperFunctions/HelperFunctions';
// import EquipmentService from '../../Services/EquipmentsService';
// import DriversService from '../../Services/DriversService';

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
            equipment_id = !objectIsEmpty(driver.equipment) ? driver.equipment : -1;
        }

        let availableEquipments = this.props.equipments.filter((equipment) => !equipment.driver.hasOwnProperty('id') && equipment.status === 'active')
        if(equipment_id !== -1){
            availableEquipments = [
                ...availableEquipments,
                this.props.equipments.filter((propsEquipment) => propsEquipment.id === equipment_id)[0]
            ]
        }

        this.state = {
            error: {
                driverNameError: 'Driver name is required',
                driverName: false,
                driverPayError: 'Driver pay cannot have characters in it',
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

    render() {

        
        const {full_name, pay_rate, equipment_id, driver, availableEquipments} = this.state;
        

        return (
            <section className='DriverEditPage width-wrapper'>

                <form className='edit-equip' onSubmit={(e) => { this.handleEquipmentEdit(e, driver) }}>
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
                                    onChange={(e) => { this.setState({full_name: e.target.value}) }}
                                />
                                {
                                    this.state.error.driverName &&
                                    <span className='error'>{this.state.error.driverNameError}</span>
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
                                    onChange={(e) => { this.setState({pay_rate: e.target.value}) }}
                                />
                                {
                                    this.state.error.driverPay &&
                                    <span className='error'>{this.state.error.driverPayError}</span>
                                }
                            </label>
                            <label htmlFor='driver'>
                                <span className='input-title'>Available Equipment</span>
                                <select 
                                    className='select-css' 
                                    value={equipment_id}
                                    onChange={(e) => {this.setState({equipment_id: e.target.value})}}>
                                        <option value='-1'>No Equipment</option>
                                        {renderEquipmentOptions(availableEquipments)}
                                </select>
                            </label>
                            <button
                                className='app-button'
                                type='submit'
                            >
                                Save Changes
                                </button>
                        </div>
                    </fieldset>
                </form>
            </section>
        );
    }
}

export default DriverEditPage;