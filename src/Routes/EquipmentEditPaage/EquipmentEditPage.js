import React, { Component } from 'react';
import './EquipmentEditPage.css';
import DriversDropDown from '../../Components/DriversDropDown/DriversDropDown';
import AppContext from '../../Contexts/AppContext';
import {
    handleGoBack,
    objectIsEmpty,
    arrayIsEmpty,
} from '../../HelperFunctions/HelperFunctions';
// import EquipmentService from '../../Services/EquipmentsService';
// import DriversService from '../../Services/DriversService';

class EquipmentEditPage extends Component {

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
        const { equipments, idleDrivers } = props;
        const { id } = this.props.rprops.match.params;
        const equipment = equipments.filter(equipment => equipment.id === parseInt(id, 10));
        let driver = {};
        let availableDrivers = idleDrivers.filter(driver => objectIsEmpty(driver.equipment))
        let unitNum = '';
        let currentDriver = -1;
        let inIdleQueue = true;
        if (equipment[0] !== undefined) {
            driver = equipment[0].driver;
            unitNum = equipment[0].unit_num;

            // The server after adding serialization is sending in full_name and driver
            // properties with empty strings so to solve and empty driver populating
            // in the select statement the below line is as is, if there is a driver.id then
            // set one else leave it to current driver which is -1
            currentDriver = driver.id ? driver.id : currentDriver;
            if (currentDriver !== -1) {
                availableDrivers.unshift(driver);
                inIdleQueue = !arrayIsEmpty(idleDrivers.filter((idleDr) => driver.id === idleDr.id));
            }
        }

        this.state = {
            error: '',
            unitNumError: false,
            unitNum,
            equipment,
            availableDrivers,
            currentDriver,
            inIdleQueue,
        }
    }

    static contextType = AppContext

    giveEquipment = (driver, equipment) => {
        driver.equipment = {
            id: equipment.id,
            unit_num: equipment.unit_num,
            status: 'active'
        }
        return driver;
    }

    takeAwayEquipment = (driver) => {
        driver.equipment = {}
        return driver;        
    }

    setDriverForEquipment = (equipment, driver) => {
        
        equipment.driver = driver
        console.log( `After settgin driver`, equipment);
        return equipment;
    }

    removeDriverFromEquipment = (equipment) => {
        console.log(`remove driver entered`);
        equipment.driver = {}
        return equipment;
    }

    changeEquipmentForDriver = (idleDrivers, driver, newDriverId, oldDriverId, equipment) => {
        if(driver.id === newDriverId && newDriverId !== -1){
            driver = this.giveEquipment(driver, equipment);
            idleDrivers.map((oldDriver) => {
                if(oldDriverId === oldDriver.id){
                    oldDriver = this.takeAwayEquipment(oldDriver)
                }
            })
        } else if (driver.id === oldDriverId){ 
            driver = this.takeAwayEquipment(driver)
        }
        return driver;
    }

    // Updates the changes in state and in the database
    handleEquipmentEdit = (e, equipmentArray) => {

        e.preventDefault();
        const equipment = equipmentArray[0];
        const oldDriverId = equipment.driver.id === undefined ? -1 : equipment.driver.id;
        const newDriverId = this.state.inIdleQueue ? parseInt(e.target['driver'].value, 10) : oldDriverId;
        const unit_num = e.target['unit-num'].value;
        const { equipments, idleDrivers, drivers } = this.props

        // first if checks if 'No Driver' just stays as is and then dont enter changing driver
        if(newDriverId !== oldDriverId){
            
            idleDrivers.map((driver) => {
                driver = this.changeEquipmentForDriver(idleDrivers, driver, newDriverId, oldDriverId, equipment);
            })

            drivers.map((driver) => {
                driver = this.changeEquipmentForDriver(drivers, driver, newDriverId, oldDriverId, equipment);
            })

            equipments.map((changeEquipemnt) => {
                if(oldDriverId === -1){
                    changeEquipemnt = this.setDriverForEquipment(equipment, idleDrivers.filter(driver => driver.id === newDriverId)[0])
                }else {
                    if(changeEquipemnt.id === equipment.id && newDriverId !== -1){
                        changeEquipemnt = this.setDriverForEquipment(equipment, idleDrivers.filter(driver => driver.id === newDriverId)[0]);
                    } else {
                        changeEquipemnt = this.removeDriverFromEquipment(equipment)
                    }
                }
                
            })
            
            // DriversService.updateEquipment(newDriverId, equipment.id)
        }

        if (unit_num !== equipment.unit_num) {
            equipments.map((changeEquipment) => {
                if (changeEquipment.id === equipment.id) {
                    changeEquipment.unit_num = unit_num
                }
            })
            // EquipmentService.updateEquipment(unit_num, equipment.id);
        }
        
        this.context.setIdleDrivers(idleDrivers);
        this.context.setEquipments(equipments);
        this.context.setDrivers(drivers);

        handleGoBack(this.props.rprops.history);

    }

    validateUnitNum = (e) => {
        const unitNum = e.target.value;
        this.setState({
            unitNum
        })
        if (unitNum.trim() === '') {
            this.setState({
                error: 'Invalid Unit Num',
                unitNumError: true
            })
        } else {
            this.setState({
                error: '',
                unitNumError: false
            })
        }
    }

    render() {

        const { unitNum, equipment, availableDrivers, currentDriver } = this.state

        return (
            <section className='EquipmentEditPage width-wrapper'>

                <form className='edit-equip' onSubmit={(e) => { this.handleEquipmentEdit(e, equipment) }}>
                    <fieldset>
                        <legend className='blue-back white-text'>
                            <button type='button' className='app-button go-back' onClick={(e) => { handleGoBack(this.props.rprops.history) }}>
                                Go Back
                            </button>
                            <span>Edit Equipment</span>
                        </legend>
                        <div className='flex'>
                            <label htmlFor='unit-num'>
                                <span className='input-title'>Unit Num:</span>
                                <input
                                    type='text'
                                    id='unit-num'
                                    name='unit-num'
                                    required
                                    value={unitNum}
                                    onChange={(e) => { this.validateUnitNum(e) }}
                                />
                                {
                                    this.state.unitNumError &&
                                    <span className='error'>{this.state.error}</span>
                                }
                            </label>
                            {
                               this.state.inIdleQueue && 
                               <label htmlFor='driver'>
                                    <span className='input-title'>Available Drivers</span>
                                    {
                                        equipment[0] !== undefined &&
                                        <DriversDropDown
                                            name={'driver'}
                                            id={'driver'}
                                            drivers={availableDrivers}
                                            className={'select-css'}
                                            defaultValue={currentDriver} />
                                    }

                                </label>
                            }
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

export default EquipmentEditPage;