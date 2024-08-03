import React, {useEffect, useState} from 'react';
import {View, StatusBar} from 'react-native';
import images from '../../index';
import {Style} from '../../styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {color_picker_set_action} from '../../redux/action';
import {RouteName} from '../../routes';
import {Lottie} from '../../components';
import {Colors} from '../../utils';
import {useSelector} from 'react-redux';

const SplashScreen = ({navigation}) => {
  const {colorrdata} = useSelector(state => state.commomReducer) || {};
  const dispatch = useDispatch();
  const [isFirstLaunch, setIsFirstLaunch] = useState(false);
  
  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const value = await AsyncStorage.getItem('alreadyLaunched');
        if (value === null) {
          await AsyncStorage.setItem('alreadyLaunched', 'true');
          setIsFirstLaunch(true);
        } else {
          setIsFirstLaunch(false);
        }
      } catch (error) {
        console.error('Error checking first launch:', error);
        setIsFirstLaunch(false); // Set isFirstLaunch to false to prevent stuck loading
      }
    };

    checkFirstLaunch();

    // Dispatch color picker action
    dispatch(color_picker_set_action(colorrdata || Colors.theme_background));
  }, [dispatch, colorrdata]);

  useEffect(() => {
    if (isFirstLaunch) {
      navigation.replace(RouteName.SWIPER_SCREEN);
    } else {
      navigation.replace(RouteName.SELECT_LANGUAGE);
    }
  }, [navigation, isFirstLaunch]);

  // >>>>>>>>>>>>>>>>>>>>>>>

  return (
    <View style={Style.SplashMinView}>
      <StatusBar backgroundColor={Colors.black_text_color} />
      <View style={Style.MinViewStyleSplash}>
        <Lottie source={images.Splash_Swiper} />
      </View>
    </View>
  );
};
export default SplashScreen;
