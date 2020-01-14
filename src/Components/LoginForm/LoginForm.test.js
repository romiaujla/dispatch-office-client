import React from 'react';
import ReactDOM from 'react-dom';
import LoginForm from './LoginForm';
import { BrowserRouter } from 'react-router-dom';

describe(`LoginForm Component`, () => {
  it('renders LoginForm without crashing', () => {
    
    const div = document.createElement('div');

    ReactDOM.render(
        <BrowserRouter> 
            <LoginForm /> 
        </BrowserRouter>
    , div);
    ReactDOM.unmountComponentAtNode(div);
  });
})

