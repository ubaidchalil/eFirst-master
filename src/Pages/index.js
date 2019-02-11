import DashboardNotifications from './DashboardNotifications';
import DocumentAttestation from './DocumentAttestation';
import LanguageTranslation from './LanguageTranslation';
import { DrawerNavigator, createBottomTabNavigator } from 'react-navigation'

export const Drawer = DrawerNavigator({
    DashBoard: { screen: DashboardNotifications },
    DocumentAttestation: { screen: DocumentAttestation },
    TabsNav: { screen: TabsNav }
  }, {
  //  contentComponent: SideMenu,
    drawerWidth: 250
  });

  
const TabsNav = createBottomTabNavigator({
    LanguageTranslation: { screen: LanguageTranslation },
  })
  