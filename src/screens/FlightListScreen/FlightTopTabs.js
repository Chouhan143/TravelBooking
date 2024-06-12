import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {StyleSheet, Text, View} from 'react-native';
import {SH} from '../../utils';
import {useSelector} from 'react-redux';
const Tab = createMaterialTopTabNavigator();
export const Tabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Baggage"
        component={Baggage}
        options={styles.headerStyle}
      />
      <Tab.Screen
        name="CancellationFee"
        component={CancellationFee}
        options={styles.headerStyle}
      />
      <Tab.Screen
        name="RescheduleFee"
        component={RescheduleFee}
        options={styles.headerStyle}
      />
    </Tab.Navigator>
  );
};

export const Baggage = () => {
  const BaggageItem = useSelector(
    state => state.commomReducer.flightBaggageData,
  );
  const BaggageCabinItem = useSelector(
    state => state.commomReducer.flightBaggageCabinData,
  );

  console.log('BaggageItem', BaggageItem, BaggageCabinItem);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: SH(15),
      }}>
      <View>
        <Text style={{color: 'gray'}}>PASSENGER</Text>
        <Text style={{color: '#000', fontWeight: '500'}}>Adult</Text>
        {BaggageCabinItem?.length > 1 && (
          <Text style={{color: '#000', fontWeight: '500'}}>Child</Text>
        )}
      </View>
      <View>
        <Text style={{color: 'gray'}}>CABIN</Text>
        {BaggageCabinItem.map((b, index) => (
          <Text style={{color: '#000', fontWeight: '500'}} key={index}>
            {b}
          </Text>
        ))}
      </View>
      <View>
        <Text style={{color: 'gray'}}>CHECK-IN</Text>

        {BaggageItem.map((b, index) => (
          <Text style={{color: '#000', fontWeight: '500'}} key={index}>
            {b}
          </Text>
        ))}
      </View>
    </View>
  );
};

export const CancellationFee = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: SH(15),
      }}>
      <View>
        <Text style={{color: 'gray'}}>TIME FRAME</Text>
        <Text style={{color: '#000', fontWeight: '500'}}>3-72 HOURS</Text>
        <Text style={{color: '#000', fontWeight: '500'}}>
          More than 72 hours
        </Text>
      </View>
      <View>
        <Text style={{color: 'gray'}}>AIRLINE FEE</Text>
        <Text style={{color: '#000', fontWeight: '500'}}>₹3,500 + ₹299</Text>
        <Text style={{color: '#000', fontWeight: '500'}}>₹3,000 + ₹299</Text>
      </View>
    </View>
  );
};

export const RescheduleFee = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: SH(15),
      }}>
      <View>
        <Text style={{color: 'gray'}}>TIME FRAME</Text>
        <Text style={{color: '#000', fontWeight: '500'}}>3-72 HOURS</Text>
        <Text style={{color: '#000', fontWeight: '500'}}>
          More than 72 hours
        </Text>
      </View>
      <View>
        <Text style={{color: 'gray'}}>AIRLINE FEE</Text>
        <Text style={{color: '#000', fontWeight: '500'}}>₹3,500 + ₹299</Text>
        <Text style={{color: '#000', fontWeight: '500'}}>₹3,000 + ₹299</Text>
      </View>
    </View>
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
