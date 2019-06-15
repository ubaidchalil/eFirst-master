import { createStackNavigator } from "react-navigation";

import VisaServiceHome from "../components/service/visa_service/home";
import VisaServceType from "../components/service/visa_service/type";
import VisaServiceDocs from "../components/service/visa_service/docs";
import VisaServiceDetails from "../components/service/visa_service/details";

export default (VisaServiceStack = createStackNavigator(
  {
    VisaServiceHome: {
      screen: VisaServiceHome
    },
    VisaServceType: {
      screen: VisaServceType
    },
    VisaServiceDocs: {
      screen: VisaServiceDocs
    },
    VisaServiceDetails: {
      screen: VisaServiceDetails
    }
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
));
