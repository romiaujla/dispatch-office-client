import React from 'react';
import ReactDOM from 'react-dom';
import CreateAccount from './CreateAccount';

it('renders CreateAccount Component without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CreateAccount />, div);
  ReactDOM.unmountComponentAtNode(div);
});
