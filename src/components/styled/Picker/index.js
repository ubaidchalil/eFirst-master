import React, { Component } from "react";
import { Platform, View, Text, Picker } from "react-native";
import PickerIOS from "./PickerIOS";

export default class extends Component {
  state = {
    changed: false
  };

  valueChange(value, index) {
    if (value !== -1) {
      this.setState({ changed: true });
      this.props.onSubmit(value, index);
    }
  }

  render() {
    const {
      options,
      pickerIndex,
      activeIndex,
      style,
      textStyle,
      iconStyle,
      useId
    } = this.props;

    const selected = useId
      ? options.find(({ id }) => parseInt(id) === parseInt(activeIndex)) ||
        options[0]
      : options[activeIndex || 0];

    return Platform.OS === "android" ? (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: "45%"
        }}
      >
        <Picker
          style={{
            flex: 3
          }}
          onValueChange={value => this.valueChange(value, pickerIndex)}
          selectedValue={activeIndex}
          mode="dropdown"
        >
          {useId
            ? this.props.options.map(({ name, id }) => (
                <Picker.Item key={id} label={name} value={id} />
              ))
            : options.map(({ name }, i) => (
                <Picker.Item key={i} label={name} value={i} />
              ))}
        </Picker>
      </View>
    ) : (
      <PickerIOS
        onSubmit={value => this.valueChange(value, pickerIndex)}
        currentName={selected.name}
        selectedValue={
          this.props.hide ? (this.state.changed ? selected : -1) : selected
        }
        activeIndex={activeIndex}
        options={options}
        style={style}
        useId={useId}
        textStyle={textStyle}
        iconStyle={iconStyle}
      />
    );
  }
}
