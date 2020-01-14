import React from 'react';
import ReactDOM from 'react-dom';
import AppContext from '../../Contexts/AppContext';
import LoadsPage from './LoadsPage';
import TestData from '../../HelperFunctions/TestData';
import { BrowserRouter } from 'react-router-dom';

describe(`LoadsPage Component`, () => {
    it(`renders without crashing`, () => {
        const div = document.createElement('div');
        const value = {
            drivers: TestData.drivers,
        }
        ReactDOM.render(
            <BrowserRouter>
                <AppContext.Provider value={value}>
                    <LoadsPage
                        shipments={TestData.shipments}
                    />
                </AppContext.Provider>
            </BrowserRouter>
        , div);
        ReactDOM.unmountComponentAtNode(div);
    })
})