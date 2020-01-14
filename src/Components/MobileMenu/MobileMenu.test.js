import React from 'react';
import ReactDOM from 'react-dom';
import MobileMenu from './MobileMenu';
import { BrowserRouter } from 'react-router-dom';

describe(`MobileMenu Component`, () => {
  it('renders MobileMenu without crashing', () => {
    
    const div = document.createElement('div');

    ReactDOM.render(
        <BrowserRouter> 
            <MobileMenu /> 
        </BrowserRouter>
    , div);
    ReactDOM.unmountComponentAtNode(div);
  });
})

