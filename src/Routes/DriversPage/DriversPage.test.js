import React from 'react';
import ReactDOM from 'react-dom';
import DriversPage from './DriversPage';
import { BrowserRouter } from 'react-router-dom';
import TestData from '../../HelperFunctions/TestData';
import AppContext from '../../Contexts/AppContext';

describe(`DriversPage Component`, () => {
  it('renders DriversPage without crashing', () => {
    
    const div = document.createElement('div');
    const value = {
        drivers: TestData.drivers,
        idleDrivers: TestData.idleDrivers,
        shipments: TestData.shipments,
    }

    ReactDOM.render(
        <BrowserRouter> 
            <AppContext.Provider value={value}>
                <DriversPage /> 
            </AppContext.Provider>
        </BrowserRouter>
    , div);
    ReactDOM.unmountComponentAtNode(div);
  });
})

