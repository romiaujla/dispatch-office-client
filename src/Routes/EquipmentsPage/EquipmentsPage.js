import React, { Component } from 'react';
import './EquipmentsPage.css';
import AppContext from '../../Contexts/AppContext';
import EquipmentCard from '../../Components/EquipmentCard/EquipmentCard';

class EquipmentsPage extends Component {

    static contextType = AppContext;

    handleAddEquipment = (e) => {
        e.preventDefault();
        console.log(`Equipment Add Submitted`);
    }

    renderEquipmentList = () => {

        let { equipments } = this.context;
        equipments = equipments.filter((equipment) => equipment.status === 'active')

        return equipments.map(equip => {
            return (
                <li key={equip.id}>
                    <EquipmentCard equipment={equip} />
                </li>
            )
        })
    }

    render() {
        return (
            <section className='EquipmentPage width-wrapper'>
                <div className='box'>
                    <h3 className='box-header blue-back white-text'>Equipment List</h3>
                    <ul className='equipment-list'>
                        {this.renderEquipmentList()}
                    </ul>
                </div>
            </section>
        )
    }
}


export default EquipmentsPage;