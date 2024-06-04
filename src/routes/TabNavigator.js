import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HistoryTab, HomeTab, Profile, BookingTab } from '../screens';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { Style } from '../styles';
import { ColorPicker, CustomSidebarMenu, HeaderLeftMenuIcon, AppHeader, VectorIcon } from '../components';
import RouteName from '../routes/RouteName';
import { Colors, SH, SF } from '../utils';
import { useTranslation } from "react-i18next";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const headerArray = {
  headerShown: true,
  headerShadowVisible: false,
  headerTitleStyle: Style.headerTitleStyle,
  headerTintColor: Colors.theme_background,
  headerStyle: Style.headerStyle
};
function DrawerSidebarScreen(props) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
      <CustomSidebarMenu {...props} />
    </DrawerContentScrollView>
  );
}
function MyDrawer() {
  return (
    <Drawer.Navigator initialRouteName="HomeScsreenTabAll" drawerContent={props => <DrawerSidebarScreen {...props} />}>
      <Drawer.Screen name="HomeScsreenTabAll"
        options={{ headerShown: false }}
        component={HomeScsreenTabAll} />
    </Drawer.Navigator>
  );
}
function Root() {
  return (
    <Stack.Navigator screenOptions="screen">
      <Stack.Screen
        name="Drawer"
        component={MyDrawer}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Homese" component={HomeScsreenTabAll} />
    </Stack.Navigator>
  );
}
export default Root;

function HomeTabScreenStack(props) {
  const { t } = useTranslation();
  return (
    <Stack.Navigator initialRouteName="HomeTab">
      <Stack.Screen
        name="HomeTab"
        component={HomeTab}
        options={{
          headerTitle: (props) => <AppHeader rightView={Style.RemoveBgColor} {...props} headerTitle={t("Home_Text")} />,
          ...headerArray,
          headerLeft: () => (
            <HeaderLeftMenuIcon {...props} />
          ),
          headerRight: () => (
            <ColorPicker />
          ),
        }}
      />
    </Stack.Navigator>
  );
}
function BookingTabScreenStack(props) {
  const { t } = useTranslation();
  return (
    <Stack.Navigator initialRouteName="BookingTab">
      <Stack.Screen
        name="BookingTab"
        component={BookingTab}
        options={{
          headerTitle: (props) => <AppHeader rightView={Style.RemoveBgColor} {...props} headerTitle={t("Booking")} />,
          ...headerArray,
          headerLeft: () => (
            <HeaderLeftMenuIcon {...props} />
          ),
          headerRight: () => (
            <ColorPicker />
          ),
        }}
      />
    </Stack.Navigator>
  );
}
function HistoryTabStack(props) {
  const { t } = useTranslation();
  return (
    <Stack.Navigator initialRouteName="HistoryTab">
      <Stack.Screen
        name="HistoryTab"
        component={HistoryTab}
        options={{
          headerTitle: (props) => <AppHeader rightView={Style.RemoveBgColor} {...props} headerTitle={t("Payment_History")} />,
          ...headerArray,
          headerLeft: () => (
            <HeaderLeftMenuIcon {...props} />
          ),
          headerRight: () => (
            <ColorPicker />
          ),
        }}
      />
    </Stack.Navigator>
  );
}
function ProfileScreenStack(props) {
  const { t } = useTranslation();
  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerTitle: (props) => <AppHeader rightView={Style.RemoveBgColor} {...props} headerTitle={t("Profile_Text")} />,
          ...headerArray,
          headerLeft: () => (
            <HeaderLeftMenuIcon {...props} />
          ),
        }}
      />
    </Stack.Navigator>
  );
}
export function HomeScsreenTabAll() {
  const { t } = useTranslation();
  return (
    <Tab.Navigator initialRouteName="Homes"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.theme_background,
        tabBarInactiveTintColor: Colors.gray_text_color,
        labeled: true,
        tabStyle: {
          height: SH(49),
          backgroundColor: Colors.white_text_color,
          paddingTop: SH(0),
        },
      }}
    >
      <Tab.Screen
        name={RouteName.HOME_TAB}
        component={HomeTabScreenStack}
        options={{
          tabBarLabel: t("Home_Text"),
          tabBarIcon: ({ focused }) => (
            <VectorIcon
              icon="Feather"
              size={SF(19)}
              name="home"
              color={focused ? Colors.theme_background : Colors.gray_text_color}
            />
          ),
        }}
      />
      <Tab.Screen
        name={RouteName.BOOKING_TAB}
        component={BookingTabScreenStack}
        options={{
          tabBarLabel: t("Ticket_book"),
          tabBarIcon: ({ focused }) => (
            <VectorIcon
              size={SF(19)}
              icon="Entypo"
              name="ticket"
              color={focused ? Colors.theme_background : Colors.gray_text_color}
            />
          ),
        }}
      />
      <Tab.Screen
        name={RouteName.HISTORY_TAB}
        component={HistoryTabStack}
        options={{
          tabBarLabel: t("Payment_History"),
          tabBarIcon: ({ focused }) => (
            <View>
              <VectorIcon icon="MaterialIcons" name="history" color={focused ? Colors.theme_background : Colors.gray_text_color} size={SF(20)} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={RouteName.PROFILE_TAB}
        component={ProfileScreenStack}
        options={{
          tabBarLabel: t("Profile_Text"),
          tabBarIcon: ({ focused }) => (
            <VectorIcon
              icon="FontAwesome"
              size={SF(19)}
              name="user-circle"
              color={focused ? Colors.theme_background : Colors.gray_text_color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  )
}
