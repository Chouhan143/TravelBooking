import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {StyleSheet, Text, View} from 'react-native';
import {SH} from '../../../utils';
import {useSelector} from 'react-redux';
import Seat from './Flight_Seat';
import Meal from './Flight_Meal';
import Baggage from './Flight_Baggage';
const Tab = createMaterialTopTabNavigator();
export const FlightSeatMealsBaggage = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Seat" component={Seat} options={styles.headerStyle} />
      <Tab.Screen name="Meal" component={Meal} options={styles.headerStyle} />
      <Tab.Screen
        name="Baggage"
        component={Baggage}
        options={styles.headerStyle}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    tabBarLabelStyle: {
      fontWeight: '700',
    },
    tabBarInactiveTintColor: 'rgba(0,0,0,0.5)',
    tabBarActiveTintColor: 'rgba(0,0,0,1)',
  },
});
