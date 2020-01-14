import React from 'react';
import ReactDOM from 'react-dom';
import Logout from './Logout';
import { BrowserRouter } from 'react-router-dom';

describe(`Logout Component`, () => {
  it('renders Logout without crashing', () => {
    
    const div = document.createElement('div');

    ReactDOM.render(
        <BrowserRouter> 
            <Logout /> 
        </BrowserRouter>
    , div);
    ReactDOM.unmountComponentAtNode(div);
  });
})

