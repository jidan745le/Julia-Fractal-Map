import React, { Component } from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { Control } from "./component/Control/Control"





function App(props) {
  return <Provider store={store}>
    <Control />
  </Provider>
}

ReactDom.render(<App />, document.getElementById("panel"));









