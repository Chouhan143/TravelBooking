// import React, { useState, useEffect } from 'react';
// import RouteName from './RouteName';
// import { CustomSidebarMenu, AppHeader } from '../components';
// import { Colors } from '../utils';
// import { DefaultTheme } from '@react-navigation/native';
// import { createDrawerNavigator } from "@react-navigation/drawer";
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { useTranslation } from "react-i18next";
// import { useSelector } from "react-redux";
// import { TabNavigator } from '../routes';
// import {
//   SettingsScreen, HelpScreen, FAQScreen, ReviewsScreen, NotificationScreen,
// } from '../screens';
// import { Style } from '../styles';

// const SideNavigator = (props) => {
//   const Stack = createNativeStackNavigator();
//   const Drawer = createDrawerNavigator();

//   const headerArray = {
//     headerShown: true,
//     headerShadowVisible: false,
//     headerTintColor: Colors.theme_background,
//     headerStyle: Style.headerStyle
//   };
//   const { detailsStore } = useSelector(state => state.commomReducer) || { detailsStore };
//   const { t } = useTranslation();
//   const { colorrdata } = useSelector(state => state.commomReducer) || {};
//   const MyTheme = {
//     ...DefaultTheme,
//     Colors: Colors
//   };
//   const [colorValue, setColorValue] = useState(MyTheme)
//   useEffect(() => {
//     if (Colors.length != 0 && colorrdata != "") {
//       Colors.theme_background = colorrdata;
//       const MyThemeNew = {
//         ...DefaultTheme,
//         Colors: Colors
//       };
//       setColorValue(MyThemeNew)
//     }

//   }, [colorrdata, Colors])
//   return (
//     <Drawer.Navigator theme={colorValue} drawerContent={(props) => <CustomSidebarMenu {...props} />} screenOptions={{
//       headerShown: false,
//       drawerStyle: {
//         backgroundColor: Colors.white_text_color,
//       }
//     }}
//     >
//       <Stack.Screen name={"Root"} component={TabNavigator} />
//       <Drawer.Screen
//         name={RouteName.HELP_SCREEN} component={HelpScreen}
//         options={{
//           headerTitle: (props) => <AppHeader rightView={Style.RemoveBgColor} {...props} headerTitle={t("Help_Text")} />,
//           ...headerArray,
//         }}
//       />
//       <Drawer.Screen
//         name={RouteName.FAQ_SCREEN} component={FAQScreen}
//         options={{
//           headerTitle: (props) => <AppHeader {...props} headerTitle={t("FAQ_Text")} />,
//           ...headerArray,
//         }}
//       />
//       <Drawer.Screen
//         name={RouteName.NOTIFICTION_SCREEN} component={NotificationScreen}
//         options={{
//           ...headerArray,
//           headerTitle: (props) => <AppHeader rightView={Style.RemoveBgColor} {...props} headerTitle={t("Notification_Text")} />,
//         }}
//       />
//       <Drawer.Screen
//         name={RouteName.REVIEWS_SCREEN} component={ReviewsScreen}
//         options={{
//           ...headerArray,
//           headerTitle: (props) => <AppHeader rightView={Style.RemoveBgColor} {...props} headerTitle={t("Reviews_Screen")} />,
//         }}
//       />
//       <Drawer.Screen
//         name={RouteName.SETTING_SCREEN} component={SettingsScreen}
//         options={{
//           ...headerArray,
//           headerTitle: (props) => <AppHeader rightView={Style.RemoveBgColor} {...props} headerTitle={t("Setting_Text")} />,
//         }}
//       />
//     </Drawer.Navigator>
//   );
// }
// export default SideNavigator;