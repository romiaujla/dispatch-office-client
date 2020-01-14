import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import { BrowserRouter } from 'react-router-dom';

describe(`Header Component`, () => {
  it('renders Header without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter> <Header /> </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
})

