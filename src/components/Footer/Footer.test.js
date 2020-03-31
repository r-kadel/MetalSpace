import React from 'react';
import ReactDOM from 'react-dom';
import Footer from './Footer';
import { BrowserRouter } from 'react-router-dom';
import { Context, ContextProvider } from '../../Context';

describe('<Footer />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <ContextProvider value={Context}>
        <BrowserRouter>
          <Footer />
        </BrowserRouter>
      </ContextProvider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
