import React from 'react';
import PropTypes from 'prop-types';
import { Platform, StyleSheet, Animated, Easing, ActivityIndicator } from 'react-native';

const styles = StyleSheet.create({
	spinner: {
		flex: 0,
		height: 0,
		width: 0,
	},
});

class ProgressIndicator extends React.Component {

	static propTypes = {
		size: PropTypes.number,
		thickness: PropTypes.number,
		theme: PropTypes.string,
		color: PropTypes.string,
	};

	static defaultProps = {
		size: 40,
		thickness: 3,
		theme: 'light',
		color: '',
	};

	constructor(props) {
		super(props);
		this.state = {
			rotateValue: new Animated.Value(0),
			scaleValue: new Animated.Value(1),
		};
	}

	componentDidMount() {
		if (Platform.OS === 'ios') {
			this.animate();
		}
	}

	animate = () => {
		this.state.rotateValue.setValue(0);
		this.state.scaleValue.setValue(1);
		const animProps = {
			duration: 900,
			easing: Easing.bezier(0.370, 0.100, 0.580, 0.900),
			useNativeDriver: true,
		};
		Animated.parallel([
			Animated.sequence([
				Animated.timing(
					this.state.rotateValue,
					{
						toValue: 360,
						...animProps
					}
				),
				Animated.timing(
					this.state.rotateValue,
					{
						toValue: 720,
						...animProps
					}
				),
			]),
			Animated.sequence([
				Animated.timing(
					this.state.scaleValue,
					{
						toValue: 0.80,
						...animProps
					}
				),
				Animated.timing(
					this.state.scaleValue,
					{
						toValue: 1,
						...animProps
					}
				)
			]),
		]).start(() => this.animate());
	};

	populateSpinnerStyles = () => {
		const { size, thickness, theme, color } = this.props;
		const borderRadius = size / 2;
		const trackColor = theme === 'light' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.3)';
		const spinColor = color || (theme === 'light' ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)');
		return [
			styles.spinner,
			{
				padding: borderRadius - thickness,
				borderTopRightRadius: borderRadius,
				borderBottomRightRadius: borderRadius,
				borderBottomLeftRadius: borderRadius,
				borderTopLeftRadius: borderRadius,
				borderTopWidth: thickness,
				borderRightWidth: thickness,
				borderBottomWidth: thickness,
				borderLeftWidth: thickness,
				borderTopColor: spinColor,
				borderRightColor: trackColor,
				borderBottomColor: trackColor,
				borderLeftColor: trackColor,
				transform: [{
					rotate: this.state.rotateValue.interpolate({
						inputRange: [0, 720],
						outputRange: ['0deg', '720deg']
					})
				}, {
					scale: this.state.scaleValue
				}]
			},
		];
	};

	render() {
		if (Platform.OS === 'ios') {
			return <Animated.View style={this.populateSpinnerStyles()} />;
		}
		return (
			<ActivityIndicator
				size="large"
				color={this.props.color || (this.props.theme === 'light' ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)')}
			/>
		);
	}
}

export default ProgressIndicator;
