import React, { Component } from 'react';
import './EquipmentCard.css';
import {Link} from 'react-router-dom';
import config from '../../config';

class EquipmentCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editingMode: false
        }
    }

    handleEditButton = (equipment) => {
        this.setState({
            editingMode: true
        })
        console.log(`Entered editing function`, equipment);
    }
    render() {

        const { equipment } = this.props;


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
                            <p className={equipment.driver.full_name ? '' : 'no-driver'}
                            >{equipment.driver.full_name ? equipment.driver.full_name : 'No Driver Assigned'}</p>
                        </div>
                    }
                </div>
                <div className='equipment-buttons'>
                    <Link className='app-button' to={`${config.BASEPATH}/equipments/edit/${equipment.id}`}>
                        Edit
                    </Link>
                    <button className='app-button'>
                        Delete
                    </button>
                </div>


            </div>
        )
    }
}

export default EquipmentCard;