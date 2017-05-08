/**
 * Created by pan.li on 2017/5/8.
 */
import React from 'react';

// demo4----------------组件
/*
 * 1.组件名称必须大写
 * 2.组件类只能包含一个定级标签，否则会报错
 */
class HelloMessage extends React.Component{
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
class NotesList  extends React.Component{
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
class PropTypeDemo extends React.Component{
    render(){
        return (
            <div>{this.props.title}</div>
        )
    }
}

//demo7----------------

export  {HelloMessage,NotesList, PropTypeDemo}