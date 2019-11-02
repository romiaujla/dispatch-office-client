import React, {Component} from 'react';
import './EquipmentsPage.css';
import AppContext from '../../Contexts/AppContext';
import EquipmentCard from '../../Components/EquipmentCard/EquipmentCard';

class EquipmentsPage extends Component{

    static contextType = AppContext;

    handleAddEquipment = (e) => {
        e.preventDefault();
        console.log(`Equipment Add Submitted`);
    }

    filterEquipments = (equipments, filters) => {
        return equipments.filter(equipment => equipment[filters.property] !== filters.value)
    }

    renderEquipmentList = () => {
        let { equipments } = this.context;
        
        equipments = this.filterEquipments(equipments, {
            'property': 'status',
            'value' : 'inactive'
        })

        return equipments.map(equip => {
            return (
                <li key={equip.id}>
                    <EquipmentCard equipment={equip} />
                </li>
            )
        })
    }

    render(){
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