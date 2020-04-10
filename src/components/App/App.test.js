import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Context, ContextProvider } from '../../Context/Context';

describe('<App />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <ContextProvider value={Context}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ContextProvider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});