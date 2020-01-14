import React from 'react';
import ReactDOM from 'react-dom';
import EquipmentEditPage from './EquipmentEditPage';
import { BrowserRouter } from 'react-router-dom';
import TestData from '../../HelperFunctions/TestData';

describe.only(`EquipmentEditPage Component`, () => {
  it('renders EquipmentEditPage without crashing', () => {
    
    const div = document.createElement('div');
    const rprops = {
        match: {
            params: {
                id: TestData.equipments[0].id,
            }
        }
    }

    ReactDOM.render(
        <BrowserRouter> 
            <EquipmentEditPage
                rprops={rprops}
                equipments={TestData.equipments}
                idleDrivers={TestData.idleDrivers}
                drivers={TestData.drivers} />
        </BrowserRouter>
    , div);
    ReactDOM.unmountComponentAtNode(div);
  });
})

