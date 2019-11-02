import React, { Component } from 'react';
import './EquipmentEditPage.css';
import DriversDropDown from '../../Components/DriversDropDown/DriversDropDown';
import AppContext from '../../Contexts/AppContext';
import { handleGoBack } from '../../HelperFunctions/HelperFunctions';

class EquipmentEditPage extends Component {

    static defaultProps = {
        equipments: {},
        idleDrivers: {},
        rprops: {},
    }

    constructor(props){
        super(props);

        // setting state for editing equipment
        const {equipments, idleDrivers} = props;
        const {id} = this.props.rprops.match.params;
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

    handleEquipmentEdit = (e) => {
        e.preventDefault();
        console.log(`Editing Equipment`);
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
                
                <form className='edit-equip' onSubmit={(e) => {this.handleEquipmentEdit(e)}}>
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
                                        nameId={'driver'}
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