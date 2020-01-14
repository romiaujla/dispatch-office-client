import React from 'react';
import ReactDOM from 'react-dom';
import AddEquipmentPage from './AddEquipmentPage';
import { BrowserRouter } from 'react-router-dom';

describe(`AddEquipmentPage Component`, () => {
  it('renders AddEquipmentPage without crashing', () => {
    
    const div = document.createElement('div');

    ReactDOM.render(
        <BrowserRouter> 
            <AddEquipmentPage /> 
        </BrowserRouter>
    , div);
    ReactDOM.unmountComponentAtNode(div);
  });
})

