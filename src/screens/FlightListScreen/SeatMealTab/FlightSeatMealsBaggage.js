import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {StyleSheet} from 'react-native';
import Seat from './Flight_Seat';
import Meal from './Flight_Meal';
import Baggage from './Flight_Baggage';

const Tab = createMaterialTopTabNavigator();

const FlightSeatMealsBaggage = ({selectedItem}) => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: styles.tabBarLabelStyle,
        inactiveTintColor: 'rgba(0,0,0,0.5)',
        activeTintColor: 'rgba(0,0,0,1)',
      }}>
      <Tab.Screen
        name="Seat"
        options={{tabBarLabel: 'Seat'}}
        initialParams={{selectedItem}}>
        {props => <Seat {...props} selectedItem={selectedItem} />}
      </Tab.Screen>
      <Tab.Screen
        name="Meal"
        options={{tabBarLabel: 'Meal', ...styles.headerStyle}}
        initialParams={{selectedItem}}>
        {props => <Meal {...props} selectedItem={selectedItem} />}
      </Tab.Screen>
      <Tab.Screen
        name="Baggage"
        options={{tabBarLabel: 'Baggage', ...styles.headerStyle}}
        initialParams={{selectedItem}}>
        {props => <Baggage {...props} selectedItem={selectedItem} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarLabelStyle: {
    fontWeight: '700',
  },
  headerStyle: {
    tabBarInactiveTintColor: 'rgba(0,0,0,0.5)',
    tabBarActiveTintColor: 'rgba(0,0,0,1)',
  },
});

export default FlightSeatMealsBaggage;
