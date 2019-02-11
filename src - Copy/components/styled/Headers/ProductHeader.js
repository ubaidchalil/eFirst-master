import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import { TouchableNativeFeedback, Platform } from 'react-native';
import { Color, SortTypes } from '../../../constants';
import { setSortType } from '../../Products/action';
import { RootHeaderWrapper, LeftHeaderButton, MiddleHeaderButton, RightHeaderButton, Text } from './index';
import { Button } from '../general';
import Picker from '../Picker';
import { setIsProductList } from '../../shared/action';

class ProductHeader extends Component {
	render = () => {
		const {
			navigation: { navigate, goBack },
			itemAmount,
			activeSortIndex,
			isProductList,
			setIsProductList,
			setSortType
		} = this.props;
		return (
			<RootHeaderWrapper
				style={{
					borderStyle: 'solid',
					borderBottomWidth: 1,
					borderColor: '#eee'
				}}
			>
				<Button
					onPress={() => {
						setIsProductList(true);
						goBack(null);
					}}
					background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
					style={{ flex: 0.2 }}
				>
					<LeftHeaderButton>
						<Icon name="arrow-left" size={Platform.isPad ? 35 : 25} color={Color.main} />
					</LeftHeaderButton>
				</Button>
				{!isProductList ? null : (
					<Fragment>
						<Picker
							onSubmit={index => setSortType(index)}
							options={SortTypes}
							activeIndex={activeSortIndex}
							pickerIndex={0}
							style={{ flex: 0.4 }}
							textStyle={{ fontSize: Platform.isPad ? 18 : 14 }}
							iconStyle={{ right: 3 }}
						/>
						<Button
							onPress={() => null}
							background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
							style={{ flex: 0.2 }}
						>
							<RightHeaderButton>
								<Text style={{ fontSize: Platform.isPad ? 18 : 14 }}>{`items: ${itemAmount}`}</Text>
							</RightHeaderButton>
						</Button>
					</Fragment>
				)}
			</RootHeaderWrapper>
		);
	};
}

export default connect(
	({ products, shared }) => ({
		itemAmount: products.data.length,
		activeSortIndex: products.activeSortIndex,
		isProductList: shared.isProductList
	}),
	dispatch => ({
		setSortType: typeIndex => dispatch(setSortType(typeIndex)),
		setIsProductList: state => dispatch(setIsProductList(state))
	})
)(ProductHeader);
