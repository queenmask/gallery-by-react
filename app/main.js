import React from 'react';
import ReactDom from 'react-dom';
import Demo from './components/Demo.js';
import {HelloMessage, NotesList, PropTypeDemo, RefsDemo, StateDemo} from './components/HelloMessage.js';

//demo6
//var test = 123;
//PropTypeDemo.propTypes = {
//    title: React.PropTypes.string.isRequired,
//};

ReactDom.render(
    //demo1-3
    //<Demo/>,
    //document.getElementById('demo'),

    //demo4----------this.props.name
    //<HelloMessage name = "pan"/>,
    //document.getElementById('demo'),

    //demo5------------this.props.children
    //<NotesList>
     //   <span>apple</span>
    //    <span>banana</span>
    //   <span>cherry</span>
    //</NotesList>,
    //document.getElementById('demo'),

    //demo6-------------propTypes:React.PropTypes.string.isRequired
    // Failed prop type: Invalid prop `title` of type `number` supplied to `PropTypeDemo`, expected `string`in PropTypeDemo
    //<PropTypeDemo title={test}/>,
    //document.getElementById('demo'),

    //demo7-------------------get the real DOM,by using "this.refs.refName"
    //<RefsDemo/>,
    //document.getElementById('demo'),

    //demo8----------------------state
    <StateDemo/>,
    document.getElementById('demo'),

);