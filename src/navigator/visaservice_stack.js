import {
  createStackNavigator
} from "react-navigation";

import VisaServiceHome from "../components/service/visa_service/home"
import VisaServceType from "../components/service/visa_service/type"

export default VisaServiceStack = createStackNavigator({
  
  VisaServiceHome: {
    screen: VisaServiceHome
  },
  VisaServceType: {
    screen: VisaServceType
  },
},
{
  defaultNavigationOptions: {
    header: null
  }
});
