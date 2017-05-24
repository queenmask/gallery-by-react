/**
 * Created by pan.li on 2017/5/11.
 */
import React from 'react';


class FooterBar extends React.Component{
    constructor(){
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    // 如果点击的是当前正在选中态的按钮，则翻转图片，否则将对应的图片居中
    handleClick(e){
    if (this.props.arrange.isCenter) {
        this.props.inverse();
    } else {
        this.props.center();
    }

    e.preventDefault();
    e.stopPropagation();
    }

    render(){
        var controlelrUnitClassName = "controller-unit";

        // 如果对应的是居中的图片，显示控制按钮的居中态
        if (this.props.arrange.isCenter) {
            controlelrUnitClassName += " is-center";

            // 如果同时对应的是翻转图片， 显示控制按钮的翻转态
            if (this.props.arrange.isInverse) {
            controlelrUnitClassName += " is-inverse";
            }
        }

        return (
            <span className={controlelrUnitClassName} onClick={this.handleClick}></span>
        );
    }
}

export default FooterBar;
