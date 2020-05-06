import _ from "lodash";
import React, { Component } from "react";
import ReactDom from "react-dom";
import { connect, Provider } from "react-redux";
import Gradient from "./component/Gradient/Gradient.js";
import store from "./store/store.js";
import {transformPositionToLinearGradientStyle,rgbArray} from "./util/transform.js";
import { Dialog } from "./component/Dialog/Dialog.js";


const mapStateToProps = state =>{  
  return {
    originalPositions:state.positions,
    positions: _.unzip(state.positions),
    background:transformPositionToLinearGradientStyle(state.positions)
  };
} 

const mapDispatchToProps = {
  changePosition: (payload) => ({ type: "changePosition", payload }),
};

@connect(mapStateToProps, mapDispatchToProps)
class Gradients extends Component {
  render() {     
    
    return (<div>
      {
        rgbArray.map((color, idx) => <Gradient {...this.props} key={idx} colorChannel={idx} positions={this.props.positions[idx]} />)
      }
    </div>)
  }

}


function App(props) {
  return <Provider store={store}>
            <Dialog>
              <Gradients />
            </Dialog>
        </Provider>
}

ReactDom.render(<App />, document.getElementById("panel"));









