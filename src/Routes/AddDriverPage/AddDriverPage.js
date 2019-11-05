import React, { Component } from 'react';
import './AddDriverPage.css';
import {
    handleGoBack,
    routeUserTo,
    renderEquipmentOptions,
    objectIsEmpty
} from '../../HelperFunctions/HelperFunctions';
import {
    emptySpaces,
} from '../../HelperFunctions/InputFieldValidations';
import AppContext from '../../Contexts/AppContext';
import config from '../../config';

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
                driverPayError: '',
                driverPay: false,
            },
            full_name: '',
            pay_rate: 0.0,
            equipment_id: -1,
        }
    }

    static contextType = AppContext

    updateIdleDriverQueue = (driver) => {
        let { idleDrivers } = this.context;
        idleDrivers = [
            ...idleDrivers,
            driver
        ]
        this.context.setIdleDrivers(idleDrivers)
    }

    handleAddDriver = (e) => {

        e.preventDefault();
        const {full_name, pay_rate = '0'} = e.target
        let equipment_id = parseInt(e.target['equipment_id'].value, 10);
        let equipment = {};
        if(equipment_id !== -1){
            const idleEquipment = this.context.equipments.filter(equipment => equipment.id === equipment_id)[0];
            console.log(idleEquipment);
            equipment = {
                id: idleEquipment.id,
                unit_num: idleEquipment.unit_num,
                status: 'active'
            }
        }

        let driver = {
            id: this.context.drivers.length+50,
            full_name: full_name.value,
            pay_rate: pay_rate.value,
            status: 'active',
            equipment,
        }
        
        this.updateIdleDriverQueue(driver);

        this.context.setDrivers([
            ...this.context.drivers,
            driver
        ])

        console.log(`drivers`, this.context.drivers);
        console.log(`idleDrivers`, this.context.idleDrivers);
        console.log(`idleEquipments`, this.context.idleEquipments);
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
                            <button type='button' className='app-button go-back' onClick={(e) => { handleGoBack(this.props.history) }}>
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
                                    onChange={(e) => { this.setState({full_name: e.target.value}) }}
                                />
                                {
                                    error.driverName &&
                                    <span className='error'>{error.driverNameError}</span>
                                }
                            </label>
                            <label htmlFor='pay_rate'>
                                <span className='input-title'>pay Rate</span>
                                <input
                                    type='text'
                                    id='pay_rate'
                                    name='pay_rate'
                                    min='0'
                                    placeholder='Eg. 0.43'
                                    value={this.state.pay_rate}
                                    onChange={(e) => { this.setState({pay_rate: e.target.value}) }}
                                />
                                {
                                    error.driverPay &&
                                    <span className='error'>{error.driverPayError}</span>
                                }
                            </label>
                            <label htmlFor='delivery-zipcode'>
                                <span className='input-title'>* Zipcode</span>
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