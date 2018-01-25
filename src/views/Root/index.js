// @flow

import React from 'react';
import type { Node } from 'react';
import { Provider } from 'react-redux';
import createStore from 'utils/createStore';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Reboot from 'material-ui/Reboot';
import themeConfig from 'config/theme';
import Snackbar from './Snackbar';
import MainRooter from './MainRooter';

const store = createStore();
const theme = createMuiTheme(themeConfig);

const Root = (): Node => (
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <Reboot />
      <MainRooter />
      <Snackbar />
    </MuiThemeProvider>
  </Provider>
);
Root.defaultProps = {};

export default Root;
