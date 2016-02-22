'use strict';
//react-native modal
import React, {
	PropTypes,
	Animated,
	Dimensions,
	StyleSheet,
	View
} from 'react-native';

let {
	width,
	height
} = Dimensions.get('window');

export default class PopWindow extends React.Component{

	static propTypes = {
		style: PropTypes.object,
		duration: PropTypes.number,
		children: PropTypes.node.isRequired
	};
	static defaultProps = {
		
	};

	constructor(props, context){
		super(props, context);
		this.state = {
			duration: 300,
			animVal: new Animated.Value(height),
			...this._getStateFromProps(this.props)
		}
	}

	shouldComponentUpdate(nextProps, nextState, context){
		return true;
	}

	_getStateFromProps(props){
		let {
			style,
			duration,
			children
		} = props;

		return {
			style,
			duration,
			children
		};
	}

	_getChildren(){
		return this.state.children;
	}

	show(){
		Animated.timing(this.state.animVal, {
			toValue: 0,
			duration: this.state.duration,
			easing: Animated.timing.linear
		}).start();
	}

	hide(){
		Animated.timing(this.state.animVal, {
			toValue: height,
			duration: this.state.duration,
			easing: Animated.timing.linear
		}).start();
	}

	render(){
		return (
			<Animated.View style={[styles.animated, {
				transform: [{
					translateY: this.state.animVal
				}]
			}]}>
			{this._getChildren()}
			</Animated.View>
		);
	}

};

let styles = StyleSheet.create({
	animated: {
		width: width,
		height: height,
		position: 'absolute',
		left: 0,
		bottom: 0,
		backgroundColor: 'red'
	}
});