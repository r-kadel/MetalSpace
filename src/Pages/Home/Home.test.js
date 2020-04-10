import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';
import { BrowserRouter } from 'react-router-dom';
import { Context, ContextProvider } from '../../Context/Context';

describe('<Home />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <ContextProvider value={Context}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </ContextProvider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});