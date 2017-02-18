import React from 'react';
import ReactDOM from 'react-dom';
import NilssongamesSnake from '../src';

import { AppContainer } from 'react-hot-loader';
// AppContainer is a necessary wrapper component for HMR

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component/>
    </AppContainer>,
    document.getElementById('root')
  );
};

render(NilssongamesSnake);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('../src', () => {
    render(NilssongamesSnake)
  });
}
