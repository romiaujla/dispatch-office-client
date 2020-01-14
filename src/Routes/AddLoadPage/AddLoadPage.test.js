import React from 'react';
import ReactDOM from 'react-dom';
import AddLoadPage from './AddLoadPage';
import { BrowserRouter } from 'react-router-dom';

describe(`AddLoadPage Component`, () => {
  it('renders AddLoadPage without crashing', () => {
    
    const div = document.createElement('div');

    ReactDOM.render(
        <BrowserRouter> 
            <AddLoadPage /> 
        </BrowserRouter>
    , div);
    ReactDOM.unmountComponentAtNode(div);
  });
})

