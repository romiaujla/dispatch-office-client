import React, { Component } from 'react';
import './EquipmentEditPage.css';
import DriversDropDown from '../../Components/DriversDropDown/DriversDropDown';
import AppContext from '../../Contexts/AppContext';
import { handleGoBack } from '../../HelperFunctions/HelperFunctions';

class EquipmentEditPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            error: '',
            unitNumError: false
        }
    }
    
    static contextType = AppContext

    handleEquipmentEdit = (e) => {
        e.preventDefaul();
        console.log(`Editing Equipment`);
    } 

    validateUnitNum = (e) => {
        const unitNum = e.target.value;
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

        const {equipments, idleDrivers} = this.context;
        const {id} = this.props.match.params;
        const equipment = equipments.filter(equipment => equipment.id === parseInt(id, 10));
        let driver = {};
        let availableDrivers = idleDrivers.filter(driver => driver);
        let unitNum = '';
        let currentDriver = -1;
        if(equipment[0] !== undefined){
            driver = equipment[0].driver;
            unitNum = equipment[0].unit_num;
            currentDriver = driver.id;
        }

        if(driver !== {}){
            availableDrivers.unshift(driver);
        }

        return (  
            <section className='EquipmentEditPage width-wrapper'>
                
                <form className='edit-equip' onSubmit={(e) => {this.handleEquipmentEdit(e)}}>
                    <fieldset>
                        <legend className='blue-back white-text'>
                            <button type='button' className='app-button go-back' onClick={(e) => {handleGoBack(this.props.history)}}>
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
                                    placeholder={unitNum}
                                    onChange={(e) => {this.validateUnitNum(e)}}
                                />
                                {
                                    this.state.unitNumError &&
                                    <span className='error'>{this.state.error}</span>
                                }
                            </label>
                            
                            <label htmlFor='password'>
                                <span className='input-title'>Available Drivers</span>
                                <DriversDropDown 
                                    drivers={availableDrivers} 
                                    className={'select-css'}
                                    defaultValue={currentDriver}/>
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