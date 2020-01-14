import React from 'react';
import ReactDOM from 'react-dom';
import EquipmentsPage from './EquipmentsPage';
import { BrowserRouter } from 'react-router-dom';

describe.only(`EquipmentsPage Component`, () => {
  it('renders EquipmentsPage without crashing', () => {
    
    const div = document.createElement('div');

    ReactDOM.render(
        <BrowserRouter> 
            <EquipmentsPage />
        </BrowserRouter>
    , div);
    ReactDOM.unmountComponentAtNode(div);
  });
})

