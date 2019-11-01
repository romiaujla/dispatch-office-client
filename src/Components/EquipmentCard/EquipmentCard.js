import React, {Component} from 'react';
import './EquipmentCard.css';

class EquipmentCard extends Component{
    
    
    render(){

        const {equipment} = this.props;

        return (
            <div className='EquipmentCard grey-back blue-text'>
                <div className='flex-row'>
                    <div className='equip-num'>
                        <h6>Unit Num</h6>
                        <p>{equipment.unit_num}</p>
                    </div>
                    {
                        equipment.driver !== null &&
                        <div className='equip-driver'>
                            <h6>Driver</h6>
                            <p>{equipment.driver.full_name}</p>
                        </div>
                    }
                </div>
                <div className='equipment-buttons'>
                    <button className='app-button'>
                        Edit
                    </button>
                    <button className='app-button'>
                        Delete
                    </button>
                </div>
            </div>
        )
    }
}

export default EquipmentCard;