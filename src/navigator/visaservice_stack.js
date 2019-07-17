import { createStackNavigator } from "react-navigation";

import VisaServiceHome from "../components/service/visa_service/home";
import VisaServceType from "../components/service/visa_service/type";
import VisaServiceDocs from "../components/service/visa_service/docs";
import VisaServiceDetails from "../components/service/visa_service/details";

export default (VisaServiceStack = createStackNavigator(
  {
    VisaServceType: {
      screen: VisaServceType
    },
    VisaServiceDocs: {
      screen: VisaServiceDocs
    },
    VisaServiceDetails: {
      screen: VisaServiceDetails
    },
    VisaServiceHome: {
      screen: VisaServiceHome
    },
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
));
