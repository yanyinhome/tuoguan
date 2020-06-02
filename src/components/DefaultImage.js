import React from 'react';

class DefaultImage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            src: this.props.src ? this.props.src : '',
            alt: this.props.alt ? this.props.alt : ''
        }
    }

    handleImageLoaded() {
        //加载完毕
    }

    handleImageErrored() {
        //加载失败
        this.setState({
            src: require('../assets/top@2x.png')
        });
    }

    render() {
        let props = this.props;
        return (
            <img
                {...props}
                src={this.state.src}
                alt={this.state.alt}
                onLoad={this.handleImageLoaded.bind(this)}
                onError={this.handleImageErrored.bind(this)}
            />
        );
    }
}

export default DefaultImage;
