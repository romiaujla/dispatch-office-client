import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './HomePage';
import { BrowserRouter } from 'react-router-dom';

describe.only(`HomePage Component`, () => {
  it('renders HomePage without crashing', () => {
    
    const div = document.createElement('div');

    ReactDOM.render(
        <BrowserRouter> 
            <HomePage />
        </BrowserRouter>
    , div);
    ReactDOM.unmountComponentAtNode(div);
  });
})

