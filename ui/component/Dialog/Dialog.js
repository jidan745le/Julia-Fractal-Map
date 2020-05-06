import React, { Component } from "react";
import "./Dialog.css";

export var addDomDragHandle = ((dom, handle) => {
    dom.addEventListener("mousedown", function (e) {
        document.addEventListener("mousemove", handle);
    });
    dom.addEventListener("mouseup", function () {
        document.removeEventListener("mousemove", handle)
    });
})

export function getPositionOfDom(element) {
    let left = parseInt(window.getComputedStyle(element)["left"]);
    let top = parseInt(window.getComputedStyle(element)["top"]);
    return { left, top }
}

export class Dialog extends Component {
    constructor(props) {
        super(props);
        this.$dialog =  React.createRef();
        this.$header = React.createRef();  
    }

    componentDidMount(){
        this.$dialog =  this.$dialog.current;
        this.$header = this.$header.current;
        console.log(this.$dialog,this.$header);

        addDomDragHandle(this.$header,(e)=>{
            e.preventDefault();                       
            this.$dialog.style.left = getPositionOfDom(this.$dialog).left + e.movementX + "px";
            this.$dialog.style.top = getPositionOfDom(this.$dialog).top + e.movementY + "px";
        })
    }

    render(){
        return <div  className="win98">
        <div ref={this.$dialog} className="resizable window">
        <div id="header" ref={this.$header} className="header">
            app
      <div className="buttons">
                <button>_</button>
                <button>◽</button>
                <button>X</button>
            </div>
        </div>
        <div className="content">
            {this.props.children}
        </div>
    </div>
    </div>
    }

}