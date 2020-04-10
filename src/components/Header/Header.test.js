import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import { BrowserRouter } from 'react-router-dom';
import { Context, ContextProvider } from '../../Context/Context';

describe('<Header />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <ContextProvider value={Context}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </ContextProvider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});