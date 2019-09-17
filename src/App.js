import React, { Component } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { SafeAreaView } from "react-navigation";
import Navigator from "./navigator/root";
import { StateComponent } from "./components/styled/components";
import initStore from "./store";
import { StatusBar, View, Platform } from "react-native";

import { Provider as PaperProvider } from "react-native-paper";
import RootContainer from "./RootContainer";
const { store, persistor } = initStore();
const STATUS_BAR_HEIGHT = Platform.OS === "ios" ? 40 : StatusBar.currentHeight;
import { Sentry, SentrySeverity, SentryLog } from "react-native-sentry";
const sentryDsn = Platform.select({
  android: "https://1d19dbd920d1454d848c6e17d358f6b5@sentry.io/1531525",
  ios: "https://1d19dbd920d1454d848c6e17d358f6b5@sentry.io/1531525"
});
Sentry.config(sentryDsn, {
  logLevel: SentryLog.Debug,
  deactivateStacktraceMerging: false
}).install();

import OneSignal from "react-native-onesignal";
OneSignal.init("83811424-4d3d-469e-adf6-f95169abe477", {
  kOSSettingsKeyAutoPrompt: true
});
export default class App extends Component {
  render = () => (
    <Provider store={store}>
      <PersistGate
        persistor={persistor}
        loading={<StateComponent loading error={false} />}
      >
        <RootContainer />
      </PersistGate>
    </Provider>
  );
}
