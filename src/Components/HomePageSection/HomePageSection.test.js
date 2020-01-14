import React from 'react';
import ReactDOM from 'react-dom';
import HomePageSection from './HomePageSection';
import { BrowserRouter } from 'react-router-dom';

describe(`HomePageSection Component`, () => {
  it('renders HomePageSection without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter> <HomePageSection /> </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
})

