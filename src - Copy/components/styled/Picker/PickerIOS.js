import React, { Component } from 'react';

import { TouchableOpacity, View, Modal, PickerIOS, Dimensions, Platform } from 'react-native';
import { width } from '../general';
import Icon from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';
import { Color } from '../../../constants';

const IOSPickerText = styled.Text`
	text-align: center;
	width: 100%;
	font-size: ${Platform.isPad ? '24' : '16'};
	font-weight: 300;
	color: #000;
`;

const Wrapper = styled.View`
	flex: 1;
	justify-content: flex-end;
	align-items: center;
`;

const ModalContainer = styled.View`
	width: ${width};
	justify-content: center;
	align-items: center;
	padding-top: 5%;
	background-color: #f5fcff;
`;

const Overlay = styled.View`
	flex: 1;
	width: ${width};
`;

const PickerWrapper = styled.View`
	width: ${width};
`;

const SubmitText = styled.Text`
	font-size: ${Platform.isPad ? 28 : 20};
	color: ${Color.secondary};
`;

class ApplePicker extends Component {
	state = {
		modalVisible: false,
		activeIndex: 0
	};

	componentDidMount = () => this.setState({ activeIndex: this.props.activeIndex });

	onPressCancel = () => this.hide();

	onPressSubmit = () => {
		this.props.onSubmit(this.state.activeIndex === -1 ? 0 : this.state.activeIndex);
		this.hide();
	};

	onOverlayDismiss = () => this.hide();

	onValueChange = option =>
		this.setState({
			activeIndex: option
		});

	show = () =>
		this.setState({
			modalVisible: true
		});

	hide = () =>
		this.setState({
			modalVisible: false
		});

	render() {
		const { modalVisible, activeIndex } = this.state;
		const { options, labels } = this.props;

		return (
			<Modal animationType={'slide'} transparent visible={modalVisible} onRequestClose={() => null}>
				<Wrapper>
					<Overlay>
						<TouchableOpacity onPress={this.onOverlayDismiss}>
							<Overlay />
						</TouchableOpacity>
					</Overlay>
					<ModalContainer>
						<TouchableOpacity
							onPress={this.onPressSubmit}
							style={{ width: '100%', height: 50, justifyContent: 'center', alignItems: 'center' }}
						>
							<SubmitText>Done</SubmitText>
						</TouchableOpacity>
						<View>
							<PickerIOS
								ref={'picker'}
								style={{ width, height: 150 }}
								selectedValue={activeIndex}
								onValueChange={option => this.onValueChange(option)}
							>
								{options.map((option, index) => (
									<PickerIOS.Item
										key={option}
										value={option}
										label={labels ? labels[index] : option}
									/>
								))}
							</PickerIOS>
						</View>
					</ModalContainer>
				</Wrapper>
			</Modal>
		);
	}
}

const PickerContainer = styled.View`
	justify-content: space-around;
	align-items: center;
`;

const PickerButtonContainer = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: center;
	padding-vertical: 10;
	padding-horizontal: 10;
`;

export default class IOSPicker extends Component {
	render = () => {
		const labels = this.props.options.map(({ name }) => name);
		const options = this.props.useId
			? this.props.options.map(({ id }) => id)
			: this.props.options.map((_, index) => index);
		return (
			<PickerContainer style={this.props.style}>
				<TouchableOpacity
					style={{
						justifyContent: 'center',
						alignItems: 'center',
						textAlign: 'center'
					}}
					onPress={() => this.refs.picker.show()}
				>
					<PickerButtonContainer>
						<View
							style={{
								flexDirection: 'row',
								position: 'relative'
							}}
						>
							<IOSPickerText style={this.props.textStyle}>{this.props.currentName}</IOSPickerText>
							<Icon
								name="chevron-down"
								style={
									this.props.iconStyle
										? this.props.iconStyle
										: { position: 'absolute', right: 5, bottom: 1 }
								}
								size={Platform.isPad ? 24 : 18}
								color={Color.secondary}
							/>
						</View>
					</PickerButtonContainer>
				</TouchableOpacity>
				<ApplePicker
					ref="picker"
					activeIndex={this.props.activeIndex}
					labels={labels}
					options={options}
					onSubmit={value => this.props.onSubmit(value)}
				/>
			</PickerContainer>
		);
	};
}
