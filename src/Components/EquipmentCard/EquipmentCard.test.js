import React from 'react';
import ReactDOM from 'react-dom';
import EquipmentCard from './EquipmentCard';
import { BrowserRouter } from 'react-router-dom';
import TestData from '../../HelperFunctions/TestData';
import AppContext from '../../Contexts/AppContext';

describe(`EquipmentCard Component`, () => {
  it('renders EquipmentCard without crashing', () => {

    
    const value = {
        shipments: TestData.shipments,
        idleEquipments: TestData.idleEquipments,
    }

    const div = document.createElement('div');
    ReactDOM.render(
        <BrowserRouter> 
            <AppContext.Provider value={value}>
                <EquipmentCard equipment={TestData.equipments[0]}/> 
            </AppContext.Provider>
        </BrowserRouter>
    , div);
    ReactDOM.unmountComponentAtNode(div);
  });
})

