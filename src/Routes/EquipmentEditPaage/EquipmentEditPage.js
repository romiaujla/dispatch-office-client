import React, { Component } from 'react';
import './EquipmentEditPage.css';
import DriversDropDown from '../../Components/DriversDropDown/DriversDropDown';
import AppContext from '../../Contexts/AppContext';
import { 
    handleGoBack,
    objectIsEmpty,
} from '../../HelperFunctions/HelperFunctions';
import EquipmentService from '../../Services/EquipmentsService';
import DriversService from '../../Services/DriversService';

class EquipmentEditPage extends Component {

    static defaultProps = {
        equipments: {},
        idleDrivers: {},
        rprops: {},
    }

    constructor(props){
        super(props);

        // setting state so that edit equipment page
        // already has values in it for the selected equipment to edit
        // if not done this way , then another Get request had to be made for
        // getting equipment by id 
        const {equipments, idleDrivers} = props;
        const {id} = this.props.rprops.match.params;
        const equipment = equipments.filter(equipment => equipment.id === parseInt(id, 10));
        let driver = {};
        let availableDrivers = idleDrivers.filter(driver => {
            if(objectIsEmpty(driver.equipment)){
                return driver
            }
        });
        let unitNum = '';
        let currentDriver = -1;
        if(equipment[0] !== undefined){
            driver = equipment[0].driver;
            unitNum = equipment[0].unit_num;
            
            // The server after adding serialization is sending in full_name and driver
            // properties with empty strings so to solve and empty driver populating
            // in the select statement the below line is as is, if there is a driver.id then
            // set one else leave it to current driver which is -1
            currentDriver = driver.id ? driver.id : currentDriver;
            if(currentDriver !== -1){
                availableDrivers.unshift(driver);
            }
        }
        
        this.state = {
            error: '',
            unitNumError: false,
            unitNum,
            equipment,
            availableDrivers,
            currentDriver
        }
    }
    
    static contextType = AppContext

    // Updates the changes in state and in the database
    handleEquipmentEdit = (e, equipmentArray) => {
        e.preventDefault();
        const equipment = equipmentArray[0];
        const driverId = parseInt(e.target['driver'].value,10);
        const unit_num = e.target['unit-num'].value;
        const {equipments, idleDrivers} = this.props

        if(driverId !== equipment.driver.id){
            idleDrivers.map((driver) => {
                if(driver.id === driverId){
                    console.log(driver);
                }
            })
            // DriversService.updateEquipment(driverId, equipment.id)
        }

        if(unit_num !== equipment.unit_num){
            equipments.map((changeEquipment) => {
                if(changeEquipment.id === equipment.id){
                    changeEquipment.unit_num = unit_num
                }
            })
            this.context.setEquipments(equipments);
            // EquipmentService.updateEquipment(unit_num, equipment.id);
        }

        handleGoBack(this.props.rprops.history);
        
    } 

    validateUnitNum = (e) => {
        const unitNum = e.target.value;
        this.setState({
            unitNum
        })
        if(unitNum.trim() === '')
        {
            this.setState({
                error: 'Invalid Unit Num',
                unitNumError: true
            })
        }else{
            this.setState({
                error: '',
                unitNumError: false
            })
        }
    }

    render() { 

        const {unitNum, equipment, availableDrivers, currentDriver} = this.state

        return (  
            <section className='EquipmentEditPage width-wrapper'>
                
                <form className='edit-equip' onSubmit={(e) => {this.handleEquipmentEdit(e, equipment)}}>
                    <fieldset>
                        <legend className='blue-back white-text'>
                            <button type='button' className='app-button go-back' onClick={(e) => {handleGoBack(this.props.rprops.history)}}>
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
                                    onChange={(e) => {this.validateUnitNum(e)}}
                                />
                                {
                                    this.state.unitNumError &&
                                    <span className='error'>{this.state.error}</span>
                                }
                            </label>
                            
                            <label htmlFor='driver'>
                                <span className='input-title'>Available Drivers</span>
                                {
                                    equipment[0] !== undefined &&
                                    <DriversDropDown
                                        name={'driver'}
                                        id={'driver'}
                                        drivers={availableDrivers} 
                                        className={'select-css'}
                                        defaultValue={currentDriver}/>
                                }
                                
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
 
export default EquipmentEditPage;