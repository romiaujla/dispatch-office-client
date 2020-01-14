import React from 'react';
import ReactDOM from 'react-dom';
import EditLoadPage from './EditLoadPage';
import { BrowserRouter } from 'react-router-dom';
import TestData from '../../HelperFunctions/TestData';

describe.only(`EditLoadPage Component`, () => {
  it('renders EditLoadPage without crashing', () => {
    
    const div = document.createElement('div');
    const rprops = {
        match: {
            params: {
                id: TestData.shipments[0].id,
            }
        }
    }

    ReactDOM.render(
        <BrowserRouter> 
            <EditLoadPage 
                rprops={rprops}
                shipments={TestData.shipments}
                drivers={TestData.drivers}
                idleDrivers={TestData.idleDrivers}
            />
        </BrowserRouter>
    , div);
    ReactDOM.unmountComponentAtNode(div);
  });
})

