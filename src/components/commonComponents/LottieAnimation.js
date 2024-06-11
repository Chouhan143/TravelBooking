import React, { useMemo, useEffect, useRef } from "react";
import Lottie from 'lottie-react-native';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import { SW } from '../../utils';

function CheckBoxset(props) {
  const { source, Lottiewidthstyle,centerlottw } = props;
  const animationProgress = useRef(new Animated.Value(0));
  useEffect(() => {
    Animated.timing(animationProgress.current, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear,
      useNativeDriver: false
    }).start();
  }, [])
  const styles = useMemo(
    () =>
      StyleSheet.create({
        Setlottesfilestyle: {
          width: '100%',
        },
        centerlottw: {
          flexDirection: 'row',
          justifyContent: 'center',
          width: '100%'
        }
      }),

  );
  return (
    <View style={[styles.centerlottw, { ...centerlottw }]}>
      <Lottie
        resizeMode="cover"
        style={[styles.Setlottesfilestyle, { ...Lottiewidthstyle }]}
        autoPlay={true}
        loop
        source={source}
        progress={animationProgress.current}
      />
    </View>
  );
};
export default CheckBoxset;