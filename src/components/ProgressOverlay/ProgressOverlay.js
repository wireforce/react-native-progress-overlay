import React from 'react';
import PropTypes from 'prop-types';
import { Animated, StyleSheet } from 'react-native';
import ProgressIndicator from '../ProgressIndicator';

const styles = StyleSheet.create({
	overlay: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

const animationProps = {
	duration: 250,
	useNativeDriver: true,
};

class ProgressOverlay extends React.Component {

	static propTypes = {
		active: PropTypes.bool,
		animateIn: PropTypes.bool,
		delay: PropTypes.number,
		color: PropTypes.string,
		style: PropTypes.object, // eslint-disable-line
		indicatorProps: PropTypes.object, // eslint-disable-line
	};

	static defaultProps = {
		active: false,
		animateIn: true,
		delay: 100,
		color: 'rgba(0, 173, 255, 1)',
		style: {},
	};

	constructor(props) {
		super(props);
		this.state = {
			active: false,
			opacityValue: new Animated.Value(0),
		};
	}

	componentDidMount() {
		if (this.props.active) {
			this.activate();
		}
	}

	componentWillReceiveProps(nextProps) {
		if (!this.props.active && nextProps.active) {
			this.activate(nextProps);
		} else if (this.props.active && !nextProps.active) {
			this.deActivate();
		}
	}

	componentWillUnmount() {
		clearTimeout(this.delayTimeout);
	}

	activate = () => {
		const { animateIn, delay } = this.props;
		this.setState({
			active: true,
			opacityValue: animateIn ? this.state.opacityValue : new Animated.Value(1),
		});
		this.delayTimeout = setTimeout(() => {
			this.delayTimeout = null;
			if (animateIn) {
				Animated.timing(
					this.state.opacityValue, { toValue: 1, ...animationProps }
				).start();
			}
		}, delay);
	};

	deActivate = () => {
		const { active, opacityValue } = this.state;
		if (this.delayTimeout) {
			clearTimeout(this.delayTimeout);
			this.setState({ active: false });
			return;
		}
		if (!active) {
			return;
		}
		Animated.timing(opacityValue, { toValue: 0, ...animationProps }).start(() => {
			this.setState({ active: false });
		});
	};

	populateOverlayStyles = () => {
		const { color, style } = this.props;

		return [
			styles.overlay,
			{
				opacity: this.state.opacityValue,
				backgroundColor: color,
				...style,
			}
		];
	};

	render() {
		if (!this.state.active) {
			return null;
		}
		return (
			<Animated.View style={this.populateOverlayStyles()}>
				<ProgressIndicator {...this.props.indicatorProps} />
			</Animated.View>
		);
	}
}

export default ProgressOverlay;
