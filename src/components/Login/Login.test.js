import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Login';
import { BrowserRouter } from 'react-router-dom';
import { Context, ContextProvider } from '../../Context/Context';

describe('<Login />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <ContextProvider value={Context}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </ContextProvider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});