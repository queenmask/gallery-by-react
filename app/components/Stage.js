/**
 * Created by pan.li on 2017/5/11.
 */
import React from 'react';
import FooterBar from './FooterBar';


class ImgFigure extends React.Component{
    constructor(){
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    /*
     * imgFigure 的点击处理函数
     */
    handleClick(e) {

        if (this.props.arrange.isCenter) {
            this.props.inverse();
        } else {
            this.props.center();
        }

        e.stopPropagation();
        e.preventDefault();
    }

    render() {

        var styleObj = {};

        // 如果props属性中指定了这张图片的位置，则使用
        if (this.props.arrange.pos) {
            styleObj = this.props.arrange.pos;
        }

        // 如果图片的旋转角度有值并且不为0， 添加旋转角度
        if (this.props.arrange.rotate) {
            (['MozTransform', 'msTransform', 'WebkitTransform', 'transform']).forEach(function (value) {
                styleObj[value] = 'rotate(' + this.props.arrange.rotate + 'deg)';
            }.bind(this));
        }

        // 如果是居中的图片， z-index设为11
        if (this.props.arrange.isCenter) {
            styleObj.zIndex = 11;
        }

        var imgFigureClassName = 'img-figure';
        imgFigureClassName += this.props.arrange.isInverse ? ' is-inverse' : '';

        return (
            <figure className={imgFigureClassName} style={styleObj} onClick={this.handleClick}>
                <img src={this.props.data.imageURL}
                     alt={this.props.data.title}
                />
                <figcaption>
                    <h2 className="img-title">{this.props.data.title}</h2>
                    <div className="img-back" onClick={this.handleClick}>
                        <p>
                            {this.props.data.desc}
                        </p>
                    </div>
                </figcaption>
            </figure>
        );
    }
}

class Stage extends React.Component{

    //先处理单张图片的样子，正面，反面
    constructor(){
        super();
        this.state = {
            isLoading: true,
            imageData:[]
        }
    }

    componentDidMount() {
        var imageDatas = require('../data/imageDatas.json');
        var firstImg = require('../images/1.jpg');
        // 利用自执行函数， 将图片名信息转成图片URL路径信息
        var imageData =  function genImageURL(imageDatasArr) {
            for (var i = 0, j = imageDatasArr.length; i < j; i++) {
                var singleImageData = imageDatasArr[i];

                singleImageData.imageURL = require('../images/'+singleImageData.fileName);

                imageDatasArr[i] = singleImageData;
            }

            return imageDatasArr;
        }(imageDatas);

        this.setState = {
            isLoading: false,
            imageData :imageData
        }
    }

    //底部按钮点击后，处理图片展示
    render() {

    var controllerUnits = [],
        imgFigures = [];

        this.state.imageData.map(function (value, index) {

        if (!this.state.imgsArrangeArr[index]) {
            this.state.imgsArrangeArr[index] = {
                pos: {
                    left: 0,
                    top: 0
                },
                rotate: 0,
                isInverse: false,
                isCenter: false
            };
        }

        imgFigures.push(<FooterBar key={index} data={value} ref={'imgFigure' + index} arrange={this.state.imgsArrangeArr[index]} inverse={this.inverse(index)} center={this.center(index)}/>);

        controllerUnits.push(<ImgFigure key={index} arrange={this.state.imgsArrangeArr[index]} inverse={this.inverse(index)} center={this.center(index)}/>);
    }.bind(this));

    return (
        <section className="stage" ref="stage">
            <section className="img-sec">
                {imgFigures}
            </section>
            <nav className="controller-nav">
                {controllerUnits}
            </nav>
        </section>
    );
    }
}

export default Stage;