/**
 * Created by pan.li on 2017/5/11.
 */
import React from 'react';

class Stage extends React.Component{

    //先处理单张图片的样子，正面，反面
    constructor(){
        super();
        this.state = {
            isLoading: true
        }
    }


    //处理图片在界面散列的展示
    componentWillMount(){
        this.setState = {
            isLoading: true
        }
    }

    componentDidMount() {
        this.setState = {
            isLoading: false
        }
    }


    //底部按钮点击后，处理图片展示

    render(){

        if(this.state.isLoading){
            return <div>loading...</div>;
        }else{
            return <div>finished!</div>
        }

    }


}

export default Stage;