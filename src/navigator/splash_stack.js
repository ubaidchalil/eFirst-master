import { createStackNavigator } from "react-navigation";

import LangSelection from "../components/splashscreen/lang_selection";
import SplashSlider from "../components/splashscreen/slider";

export default (SplashStack = createStackNavigator(
  {
    LangSelection: {
      screen: LangSelection
    },
    SplashSlider: {
      screen: SplashSlider
    },
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
));
