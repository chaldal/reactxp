/*
* Main entry point for web app.
*/

import RX = require('@chaldal/reactxp');

import App = require('./App');

RX.App.initialize(true, true);
RX.UserInterface.useCustomScrollbars(true);
RX.UserInterface.setMainView(<App />);
