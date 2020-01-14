import React from 'react';
import ReactDOM from 'react-dom';
import DesktopMenu from './DesktopMenu';
import { BrowserRouter } from 'react-router-dom';

describe(`DesktopMenu Component`, () => {
  it('renders DesktopMenu without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter> <DesktopMenu /> </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
})

