import React from "react";
import Icon from "react-native-vector-icons/Feather";
import { TouchableNativeFeedback, Platform } from "react-native";
import { Color } from "../../../constants";
import { RootHeaderWrapper, LeftHeaderButton } from "./index";
import { Button } from "../general";

export default ({ navigation: { goBack } }) => (
  <RootHeaderWrapper
    style={{
      borderStyle: "solid",
      borderBottomWidth: 1,
      borderColor: "#eee"
    }}
  >
    <Button
      onPress={() => goBack(null)}
      background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
      style={{ flex: 0.2 }}
    >
      <LeftHeaderButton>
        <Icon
          name="arrow-left"
          size={Platform.isPad ? 35 : 25}
          color={Color.main}
        />
      </LeftHeaderButton>
    </Button>
  </RootHeaderWrapper>
);
