/**
 * Created by pan.li on 2017/5/8.
 */
import React from 'react';

// demo4----------------组件
/*
 * 1.组件名称必须大写
 * 2.组件类只能包含一个定级标签，否则会报错
 */
export class HelloMessage extends React.Component{
    render(){
        return (
            <h1>Hello,{this.props.name}</h1>
        )
    }
}

//demo5------------this.props.children
/*
*1.如果当前组件没有子节点，它就是 undefined ;
* 2.如果有一个子节点，数据类型是 object ；
* 3.如果有多个子节点，数据类型就是 array
 */
export class NotesList  extends React.Component{
    render(){
        return(
            <ul>
                {
                    React.Children.map(this.props.children, function (child) {
                        return (<li>Hello,{child}</li>)
                    })
                }
            </ul>
            )
    }
}

//demo6------------propTypes:React.PropTypes.string.isRequired
export class PropTypeDemo extends React.Component{
    render(){
        return (
            <div>{this.props.title}</div>
        )
    }
}

//demo7----------------get the real DOM,by using "this.refs.refName"
/**
 * !!!!!!!!!attention here: when you use this.handleClick,you need to bind(this)
 */
export class RefsDemo extends React.Component{

    handleClick(){
        this.refs.firstInput.focus();
    };

    render(){
        return (
        <div>
            <input type="text" ref="firstInput" ></input>
            <input type="button" value="test for ref" onClick={this.handleClick.bind(this)}></input>
        </div>

        )
    }
}

//demo8-------------------state

export class StateDemo extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            liked: false
        }
    }


    handleClick(){
        this.setState({liked:!this.state.liked})
    }

    render(){
        var text = this.state.liked?"like":"dislike";
        return(
            <p onClick={this.handleClick.bind(this)}>
                You {text} here!
            </p>
        )
    }
}
















