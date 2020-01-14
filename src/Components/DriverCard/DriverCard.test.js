import React from 'react';
import ReactDOM from 'react-dom';
import DriverCard from './DriverCard';
import { BrowserRouter } from 'react-router-dom';
import TestData from '../../HelperFunctions/TestData';
import AppContext from '../../Contexts/AppContext';

describe(`DriverCard Component`, () => {
  it('renders DriverCard without crashing', () => {

    const driver = TestData.drivers[0];
    const value = {
        shipments: TestData.shipments,
        idleDrivers: TestData.idleDrivers,
    }

    const div = document.createElement('div');
    ReactDOM.render(
        <BrowserRouter> 
            <AppContext.Provider value={value}>
                <DriverCard driver={driver}/> 
            </AppContext.Provider>
        </BrowserRouter>
    , div);
    ReactDOM.unmountComponentAtNode(div);
  });
})

