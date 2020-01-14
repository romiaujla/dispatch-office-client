import React from 'react';
import ReactDOM from 'react-dom';
import DriversDropDown from './DriversDropDown';

describe(`DriversDropDown Component`, () => {
  it('renders DriversDropDown without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <DriversDropDown /> 
    , div);
    ReactDOM.unmountComponentAtNode(div);
  });
})

