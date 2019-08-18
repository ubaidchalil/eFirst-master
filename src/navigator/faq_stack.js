import { createStackNavigator } from "react-navigation";

import FAQ from "../components/faq";
import FAQDetail from "../components/faq/faqdetail";

export default (FAQStack = createStackNavigator(
  {
    FAQ: {
      screen: FAQ
    },
    FAQDetail: {
      screen: FAQDetail
    }
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
));
