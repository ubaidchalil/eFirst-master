
  
export const Tabs = createBottomTabNavigator({
    DashBoard: { screen: DashboardNotifications },
    DocumentAttestation: { screen: DocumentAttestation },
    LanguageTranslation: { screen: LanguageTranslation },
  }, {
    order: ['DashBoard', 'DocumentAttestation', 'LanguageTranslation']
  })
  