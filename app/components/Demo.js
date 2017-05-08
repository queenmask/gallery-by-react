import React from 'react';

class Demo extends React.Component{
    //demo1-----------hello world
    render(){
        return (
            <div> Hello you World! 11</div>
        )
    }

    //demo2--------show Array
    // render(){
    //     var names = ['Alice', 'Emily', 'Kate'];
    //     return (
    //         <div>
    //             {
    //                 names.map(function (name, index) {
    //                     return <div key={index}>Hello, {name}!</div>
    //                 })
    //             }
    //         </div>
    //     )
    // }

    //demo3--------show Array，代码块必须在{ }内
    // render(){
    //     var arr = [
    //         <h1 key="1">Hello world!</h1>,
    //         <h2 key="2">React is awesome!</h2>,
    //     ];
    //     return (
    //         <div>{arr}</div>
    //     )
    // }




}

export default Demo;