import React from 'react';
import ReactDOM from 'react-dom';
import BackDrop from './BackDrop';

describe(`BackDrop Component`, () => {
  it('renders BackDrop without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BackDrop />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
})

