import React from 'react';
import ReactDOM from 'react-dom';
import LoadListBox from './LoadListBox';
import { BrowserRouter } from 'react-router-dom';
import AppContext from '../../Contexts/AppContext';
import TestData from '../../HelperFunctions/TestData';

describe(`LoadListBox Component`, () => {
  it('renders LoadListBox without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(
        <BrowserRouter> 
            <LoadListBox shipments={TestData.shipments}/> 
        </BrowserRouter>
    , div);
    ReactDOM.unmountComponentAtNode(div);
  });
})

