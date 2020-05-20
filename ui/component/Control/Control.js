import React, { Component } from "react";
import { connect } from "react-redux";
import { initialFractalLocationInfo, option, setPlatteOption } from "../../../modules/option";
import { render, disableFetch } from "../../../modules/fetchModule/fetchModule";
import { canvasStore } from "../../../modules/canvasModule/canvasBasic";
import Gradients from "../Gradient/Gradient"
import "./control.css";

const tabContext = React.createContext();
const TabProvider = tabContext.Provider;
const TabConsumer = tabContext.Consumer;

class Tabs extends Component {
    constructor(props) {
        super(props);
        this.state = { id: 0 };
    }


    changeTab = (tabContent, id) => {
        this.setState({ content: tabContent, id });
    }

    componentDidMount() {
        this.setState({ content: this.props.children[0].props.children });
    }

    render() {
        console.log("children", this.props.children);
        return <TabProvider value={{ changeTab: this.changeTab, id: this.state.id }}>
            <ul className="tab-menu">{this.props.children}</ul>            
            <div className="tab-content">{this.state.content ? this.state.content : ""}</div>
        </TabProvider>
    }
}

class TabPane extends Component {
    render() {
        return <TabConsumer>
            {({ changeTab, id }) => <li className={this.props.id === id ?"active":""} onClick={() => changeTab(this.props.children, this.props.id)} >{this.props.tab}</li>}
        </TabConsumer>
    }
}


const mapStateToProps = state => {
    return {
        realValue: state.juliaPara.para.real,
        imaginaryValue: state.juliaPara.para.imaginary,
    };
}

const mapDispatchToProps = {
    changeReal: (value) => ({ type: "changeReal", value }),
    changeImaginary: (value) => ({ type: "changeImaginary", value })
};

@connect(mapStateToProps, mapDispatchToProps)
class JuliaFractalControl extends Component {
    constructor(props) {
        super(props);
        this.real = React.createRef();
        this.imaginary = React.createRef();
    }

    changeReal = event => {
        this.props.changeReal(event.target.value);
        canvasStore.dispatch({ type: "reset", payload: initialFractalLocationInfo });

        option.juliaParameter.real = parseFloat(event.target.value);
        render(initialFractalLocationInfo, option);
    }

    changeImaginary = event => {
        this.props.changeImaginary(event.target.value);
        canvasStore.dispatch({ type: "reset", payload: initialFractalLocationInfo });

        option.juliaParameter.imaginary = parseFloat(event.target.value);
        render(initialFractalLocationInfo, option);
    }

    componentDidMount() {

        this.$real = this.real.current;
        this.$imaginary = this.imaginary.current;
        this.$real.value = this.props.realValue;
        this.$imaginary.value = this.props.imaginaryValue;

        this.$real.addEventListener("change", this.changeReal);
        this.$imaginary.addEventListener("change", this.changeImaginary)


    }

    componentWillUnmount() {

        this.$real.removeEventListener("change", this.changeReal);
        this.$imaginary.removeEventListener("change", this.changeImaginary)
    }

    render() {
        return <div>
            <label className="label-para">real({this.props.realValue})</label><input style={{width:"600px"}}  ref={this.real} step="0.0001" min="-1.5" max="1.5" type="range" name="real" />
            <br/>
            <label className="label-para">imaginary({this.props.imaginaryValue})</label><input style={{width:"600px"}} ref={this.imaginary} step="0.0001" min="-1.5" max="1.5" type="range" name="imaginary" />
        </div>
    }
}

class SystemOption extends Component{
    render(){
        return <RadioGroup>
            <RadioButton value=""/>
            <RadioButton value=""/>
            <RadioButton value=""/>
        </RadioGroup>
    }
}

let Control = () => {
    return <Tabs>
        <TabPane id={0} tab={"julia parameter"}><JuliaFractalControl /></TabPane>
        {/* <TabPane id={1} tab={"system option"}>system option</TabPane> */}
        <TabPane id={2} tab={"platte"}><Gradients/></TabPane>
    </Tabs>
}


export { Tabs, TabPane, Control }