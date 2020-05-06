import _ from "lodash";
import React, { Component } from "react";
import "./Gradient.css";
import {once} from "../../util/const.js";
import {transformPositionToStyle} from "../../util/transform.js";
import {initialFractalLocationInfo,option,setPlatteOption} from "../../../modules/option";
import {render} from "../../../modules/fetchModule/fetchModule";
import {canvasStore} from "../../../modules/canvasModule/canvasBasic";

export default class Gradient extends Component {

    constructor(props) {
        super(props);

        this.$gradient = React.createRef();
    }

    componentDidMount() {
        this.$currentGradient = this.$gradient.current;
    }

    changeDotPositions(dotEvent, id) {       

        this.removeMouseMoveListener = () => {
            this.$currentGradient.removeEventListener("mousemove", this.boundChangePositionsState);
            console.log("originalPositions",this.props.originalPositions)
            setPlatteOption(this.props.originalPositions);
            render(canvasStore.getState().fractalLocation, option);
        }

        this.addEventHandleForCurrentGradient = (eventType, handle, isOnce) => {
            this.$currentGradient.addEventListener(eventType, handle, isOnce ? once : false)
        }


        this.boundChangePositionsState = this.changePositionsState.bind(this, id);

        this.addEventHandleForCurrentGradient("mousemove", this.boundChangePositionsState);

        this.addEventHandleForCurrentGradient("mouseup", this.removeMouseMoveListener, once);

        this.addEventHandleForCurrentGradient("mouseleave", this.removeMouseMoveListener, once);
    }

    //when dot move,dispatch action to store
    changePositionsState(dotId, event) {
        let { clientX, clientY } = event;
        let { left, top } = this.$currentGradient.getBoundingClientRect();
        let colorChannelId = this.props.colorChannel;
        let position = { x: clientX - left, y: clientY - top };

        if (position.x < 0 || position.x > 200 || position.y < 0 || position.y > 150) {
            //边界检测，超出边界取消事件处理函数绑定
            this.removeMouseMoveListener();
            return;
        }
        console.log(position);
        this.props.changePosition({ dotId, colorChannelId, position });
    }


    render() {

        //获取控制点位置和渐进色组件的渐进背景样式
        let { positions, background } = this.props;
        let props = { changeDotPosition: this.changeDotPositions.bind(this) }

        return <div ref={this.$gradient} className="gradient" style={{ ...background }}>
            {
                positions.map((value, idx) => {
                    return <GradientControlDot id={idx} key={idx} position={value} {...props} />
                })
            }
        </div>
    }
}


function GradientControlDot({ id, position, changeDotPosition }) {
    let posStyle = transformPositionToStyle(position);
    let onMouseDownHandle = e => {
        e.preventDefault();
        changeDotPosition(e, id);
    };

    return <div className="dot" onMouseDown={onMouseDownHandle} style={posStyle}></div>
}