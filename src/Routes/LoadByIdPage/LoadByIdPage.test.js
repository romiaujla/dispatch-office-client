import React from 'react';
import ReactDOM from 'react-dom';
import LoadByIdPage from './LoadByIdPage';
import { BrowserRouter } from 'react-router-dom';
import TestData from '../../HelperFunctions/TestData';
import AppContext from '../../Contexts/AppContext';

describe(`LoadByIdPage Component`, () => {
  it('renders LoadByIdPage without crashing', () => {
    
    const div = document.createElement('div');
    const rprops = {
        match: {
            params: {
                id: TestData.shipments[0].id,
            }
        }
    }

    const value = {
        idleDrivers: TestData.idleDrivers,
        shipments: TestData.shipments,
        drivers: TestData.drivers,
    }

    ReactDOM.render(
        <BrowserRouter> 
            <AppContext.Provider value={value}>
                <LoadByIdPage 
                    rprops={rprops}
                    shipments={TestData.shipments}
                    idleDrivers={TestData.idleDrivers}
                />
            </AppContext.Provider>
        </BrowserRouter>
    , div);
    ReactDOM.unmountComponentAtNode(div);
  });
})

