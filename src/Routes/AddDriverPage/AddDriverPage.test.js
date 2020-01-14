import React from 'react';
import ReactDOM from 'react-dom';
import AddDriverPage from './AddDriverPage';
import { BrowserRouter } from 'react-router-dom';

describe(`AddDriverPage Component`, () => {
  it('renders AddDriverPage without crashing', () => {
    
    const div = document.createElement('div');

    ReactDOM.render(
        <BrowserRouter> 
            <AddDriverPage /> 
        </BrowserRouter>
    , div);
    ReactDOM.unmountComponentAtNode(div);
  });
})

