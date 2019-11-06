import React, { Component } from 'react';
import './AddEquipmentPage.css';
import {
    handleGoBack,
    routeUserTo,
    renderDriverOptions,
    objectIsEmpty,
} from '../../HelperFunctions/HelperFunctions';
import AppContext from '../../Contexts/AppContext';
import config from '../../config';
import { emptySpaces } from '../../HelperFunctions/InputFieldValidations';
import EquipmentService from '../../Services/EquipmentsService';
import DriversService from '../../Services/DriversService';

class AddEquipmentPage extends Component {

    static defaultProps = {
        rprops: {},
        drivers: [],
    }

    constructor(props) {
        super(props);
        this.state = {
            availableDrivers: [],
            error: {
                equipmentNumError: 'Equipment number is required',
                equipmentNum: false,
            },
            unit_num: '',
            driver_id: -1,
        }
    }

    static contextType = AppContext

    validateUnitNumField = (unit_num) => {
        this.setState({
            unit_num
        })
        if(emptySpaces(unit_num)){
            this.setState({
                hasError: true,
                error: {
                    equipmentNumError: 'Equipment number is required',
                    equipmentNum: true,
                }
            })
        }else{
            this.setState({
                hasError: false,
                error: {
                    equipmentNumError: '',
                    equipmentNum: false,
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

    handleAddEquipment = async (e) => {

        e.preventDefault();

        const unit_num = e.target['unit_num'].value;
        const driver_id = parseInt(e.target['driver_id'].value,10);

        // Add Equipment to the db
        const dbEquipment = await EquipmentService.addNewEquipment(unit_num);        

        let equipment = {
            unit_num: dbEquipment.unit_num,
            id: dbEquipment.id,
            status: 'active'
        }

        let driver = {}
        let {equipments, drivers, idleDrivers} = this.context

        if(driver_id !== -1){

            // update driver to reference equipment in the db
            DriversService.updateEquipment(driver_id, equipment.id);

            drivers = drivers.map((contextDriver) => {
                if(contextDriver.id === driver_id){
                    contextDriver.equipment = equipment
                    driver = {
                        id: contextDriver.id,
                        full_name: contextDriver.full_name,
                        pay_rate: contextDriver.pay_rate,
                        status: 'active',
                    }
                }
                return contextDriver;
            })
            
            idleDrivers = idleDrivers.map((idleDriver) => {
                if(idleDriver.id === driver_id){
                    idleDriver.equipment = equipment
                }
                return idleDriver;
            })
        } else {
            driver = {
                full_name: '',
                pay_rate: ''
            }
        }

        // adding driver to the equipment 
        equipment = {
            ...equipment,
            driver,
        }

        // adding new equipment to all equipments array
        equipments = [
            ...equipments,
            equipment
        ]
        
        this.context.setDrivers(drivers);
        this.context.setIdleDrivers(idleDrivers);
        this.context.setEquipments(equipments);
        routeUserTo(this.props.rprops.history, `${config.BASEPATH}/equipments`)
    }

    render() {

        const { error } = this.state
        const availableDrivers = this.props.drivers.filter((driver) => objectIsEmpty(driver.equipment) && driver.status === 'active')

        return (
            <section className='AddEquipmentPage width-wrapper'>
                <form className='add-load-form' onSubmit={(e) => { this.handleAddEquipment(e) }}>
                    <fieldset>
                        <legend className='blue-back white-text'>
                            <button type='button' className='app-button go-back' onClick={(e) => { handleGoBack(this.props.rprops.history) }}>
                                Go Back
                            </button>
                            <span>Add Equipment</span>
                        </legend>
                        <div className='flex'>
                            <label htmlFor='unit_num'>
                                <span className='input-title'>* Equipment Number</span>
                                <input
                                    type='text'
                                    id='unit_num'
                                    name='unit_num'
                                    placeholder='Eg. A 101'
                                    value={this.state.unit_num}
                                    onChange={(e) => { this.validateUnitNumField(e.target.value) }}
                                    required
                                />
                                {
                                    error.equipmentNum &&
                                    <span className='error'>{error.equipmentNumError}</span>
                                }
                            </label>
                            <label htmlFor='driver_id'>
                                <span className='input-title'>Available Drivers</span>
                                <select className='select-css' 
                                    name='driver_id' 
                                    id='driver_id'
                                    value={this.state.driver_id}
                                    onChange={(e) => {this.setState({driver_id: e.target.value})}}
                                >
                                    <option value='-1'>No Driver</option>
                                    {renderDriverOptions(availableDrivers)}
                                </select>
                                
                            </label>
                            {
                                !error.equipmentNum
                                    ?
                                    <button
                                        className='app-button'
                                        type='submit'
                                    >
                                        Add New Equipment
                                    </button>
                                    :
                                    <button
                                        className='app-button'
                                        type='submit'
                                        disabled
                                    >
                                        Add New Equipment
                                    </button>
                            }

                        </div>
                    </fieldset>
                </form>
            </section>
        );
    }
}

export default AddEquipmentPage;