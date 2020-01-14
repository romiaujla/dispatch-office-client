import React from 'react';
import ReactDOM from 'react-dom';
import CreateAccountPage from './CreateAccountPage';
import { BrowserRouter } from 'react-router-dom';

describe(`CreateAccountPage Component`, () => {
  it('renders CreateAccountPage without crashing', () => {
    
    const div = document.createElement('div');

    ReactDOM.render(
        <BrowserRouter> 
            <CreateAccountPage /> 
        </BrowserRouter>
    , div);
    ReactDOM.unmountComponentAtNode(div);
  });
})

