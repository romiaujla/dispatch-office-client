import React from 'react';
import ReactDOM from 'react-dom';
import DriverEditPage from './DriverEditPage';
import { BrowserRouter } from 'react-router-dom';
import TestData from '../../HelperFunctions/TestData';

describe.only(`DriverEditPage Component`, () => {
  it('renders DriverEditPage without crashing', () => {
    
    const div = document.createElement('div');
    const rprops = {
        match: {
            params: {
                id: TestData.drivers[0].id,
            }
        }
    }

    ReactDOM.render(
        <BrowserRouter> 
            <DriverEditPage
                  rprops={rprops}
                  equipments={TestData.equipments}
                  idleDrivers={TestData.idleDrivers}
                  drivers={TestData.drivers} />
        </BrowserRouter>
    , div);
    ReactDOM.unmountComponentAtNode(div);
  });
})

