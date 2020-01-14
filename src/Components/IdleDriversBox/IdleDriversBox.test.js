import React from 'react';
import ReactDOM from 'react-dom';
import IdleDriversBox from './IdleDriversBox';
import { BrowserRouter } from 'react-router-dom';
import AppContext from '../../Contexts/AppContext';
import TestData from '../../HelperFunctions/TestData';

describe(`IdleDriversBox Component`, () => {
  it('renders IdleDriversBox without crashing', () => {
    const div = document.createElement('div');
    
    const value = {
        idleDrivers: TestData.idleDrivers,
    }

    ReactDOM.render(
        <BrowserRouter> 
            <AppContext.Provider value={value}>
                <IdleDriversBox /> 
            </AppContext.Provider>
        </BrowserRouter>
    , div);
    ReactDOM.unmountComponentAtNode(div);
  });
})

