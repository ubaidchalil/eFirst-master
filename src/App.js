import React, { Component } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { SafeAreaView } from "react-navigation";
import Navigator from "./navigator/root";
import { StateComponent } from "./components/styled/components";
import initStore from "./store";
import { StatusBar, View, Platform } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
const { store, persistor } = initStore();
const STATUS_BAR_HEIGHT = Platform.OS === "ios" ? 40 : StatusBar.currentHeight;
export default class App extends Component {
  render = () => (
    <Provider store={store}>
      <PersistGate
        persistor={persistor}
        loading={<StateComponent loading error={false} />}
      >
        <SafeAreaView
          style={{ flex: 1 }}
          forceInset={{ bottom: "never", top: "never" }}
        >
          {Platform.OS === "ios" && (
            <View
              style={{
                width: "100%",
                height: STATUS_BAR_HEIGHT,
                backgroundColor: "#183E61"
              }}
            >
              <StatusBar barStyle="light-content" />
            </View>
          )}
          <StatusBar backgroundColor="#183E61" barStyle="light-content" />
          <PaperProvider>
            <Navigator />
          </PaperProvider>
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
}
