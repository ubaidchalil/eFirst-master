import { createStackNavigator } from "react-navigation";

import ServiceDetail from "../components/service/servicerequest";
import UserActions from "../components/service/useractions";

export default (SRStack = createStackNavigator(
  {
    UserActions: {
      screen: UserActions
    },
    ServiceDetail: {
      screen: ServiceDetail
    }
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
));
