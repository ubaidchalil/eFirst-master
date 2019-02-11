import React, { Component } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { SafeAreaView } from "react-navigation";
import Navigator from "./navigator/root";
import { StateComponent } from "./components/styled/components";
import initStore from "./store";
import { Provider as PaperProvider } from "react-native-paper";
const { store, persistor } = initStore();

export default class App extends Component {
  render = () => (
    <Provider store={store}>
      <PersistGate
        persistor={persistor}
        loading={<StateComponent loading error={false} />}
      >
        <SafeAreaView style={{ flex: 1 }} forceInset={{ bottom: "never" }}>
          <PaperProvider>
            <Navigator />
          </PaperProvider>
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
}
