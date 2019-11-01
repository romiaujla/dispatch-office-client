import React, {Component} from 'react';
import './EquipmentCard.css';

class EquipmentCard extends Component{
    
    
    render(){

        const {equipment} = this.props;

        return (
            <div className='EquipmentCard grey-back'>
                <h6>Unit Num</h6>
                <p>{equipment.unit_num}</p>
            </div>
        )
    }
}

export default EquipmentCard;