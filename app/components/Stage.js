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
    handleClick() {

        if (this.props.arrange.isCenter) {
            this.props.inverse();
        } else {
            this.props.center();
        }
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
                <img src={this.props.arrange.imageURL}
                     alt={this.props.arrange.title}
                />
                <figcaption>
                    <h2 className="img-title">{this.props.arrange.title}</h2>
                    <div className="img-back" onClick={this.handleClick}>
                        <p>
                            {this.props.arrange.desc}
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
    /*
     * 翻转图片
     * @param index 传入当前被执行inverse操作的图片对应的图片信息数组的index值
     * @returns {Function} 这是一个闭包函数, 其内return一个真正待被执行的函数
     */
    inverse(index) {
    return function () {
        var imgsArrangeArr = this.state.imageData;

        imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;

        this.setState({
            imgsArrangeArr: imgsArrangeArr
        });
    }.bind(this);
    }

    /*
     * 重新布局所有图片
     * @param centerIndex 指定居中排布哪个图片
     */
    rearrange(centerIndex) {
    var imgsArrangeArr = this.state.imgsArrangeArr,
        Constant = this.Constant,
        centerPos = Constant.centerPos,
        hPosRange = Constant.hPosRange,
        vPosRange = Constant.vPosRange,
        hPosRangeLeftSecX = hPosRange.leftSecX,
        hPosRangeRightSecX = hPosRange.rightSecX,
        hPosRangeY = hPosRange.y,
        vPosRangeTopY = vPosRange.topY,
        vPosRangeX = vPosRange.x,

        imgsArrangeTopArr = [],
        topImgNum = Math.floor(Math.random() * 2),    // 取一个或者不取
        topImgSpliceIndex = 0,

        imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);

    // 首先居中 centerIndex 的图片, 居中的 centerIndex 的图片不需要旋转
    imgsArrangeCenterArr[0] = {
        pos: centerPos,
        rotate: 0,
        isCenter: true
    };

    // 取出要布局上侧的图片的状态信息
    topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum));
    imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);

    // 布局位于上侧的图片
    imgsArrangeTopArr.forEach(function (value, index) {
        imgsArrangeTopArr[index] = {
            pos: {
                top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
                left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
            },
            rotate: get30DegRandom(),
            isCenter: false
        };
    });

    // 布局左右两侧的图片
    for (var i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++) {
        var hPosRangeLORX = null;

        // 前半部分布局左边， 右半部分布局右边
        if (i < k) {
            hPosRangeLORX = hPosRangeLeftSecX;
        } else {
            hPosRangeLORX = hPosRangeRightSecX;
        }

        imgsArrangeArr[i] = {
            pos: {
                top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
                left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
            },
            rotate: get30DegRandom(),
            isCenter: false
        };

    }

    if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
        imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0]);
    }

    imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);

    this.setState({
        imgsArrangeArr: imgsArrangeArr
    });
}

    /*
     * 利用arrange函数， 居中对应index的图片
     * @param index, 需要被居中的图片对应的图片信息数组的index值
     * @returns {Function}
     */
    center(index) {
    return function () {
        this.rearrange(index);
    }.bind(this);
    }



    componentWillMount() {
        var imageDatas = require('../data/imageDatas.json');
        // 利用自执行函数， 将图片名信息转成图片URL路径信息
        var imageData =  function genImageURL(imageDatasArr) {
            for (var i = 0, j = imageDatasArr.length; i < j; i++) {
                var singleImageData = imageDatasArr[i];

                singleImageData.imageURL = require('../images/'+singleImageData.fileName);

                imageDatasArr[i] = singleImageData;
            }

            return imageDatasArr;
        }(imageDatas);

        this.setState({
            isLoading: false,
            imageData :imageData
        })
    }

    //底部按钮点击后，处理图片展示
    render() {

    var controllerUnits = [],
        imgFigures = [];

        this.state.imageData.map(function (value, index) {

        if (!this.state.imageData[index]) {
            this.state.imageData[index] = {
                pos: {
                    left: 0,
                    top: 0
                },
                rotate: 0,
                isInverse: false,
                isCenter: false
            };
        }

        imgFigures.push(<FooterBar key={index} data={value} ref={'imgFigure' + index} arrange={this.state.imageData[index]} inverse={this.inverse(index)} center={this.center(index)}/>);

        controllerUnits.push(<ImgFigure key={index} arrange={this.state.imageData[index]} inverse={this.inverse(index)} center={this.center(index)}/>);
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