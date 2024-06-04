import React, {useMemo} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import propTypes from 'prop-types';

function RowComponent({children, rowStyle, flex, backgroundColor, width, height, alignItems, touchable, onPress }){
  const styles = useMemo(
    () =>
      StyleSheet.create({
        rowStyles: {
          flexDirection: 'row',
          flex: flex,
          backgroundColor: backgroundColor,
          width: width,
          height: height,
          alignItems: alignItems,
          ...rowStyle,
        },
      }),
    [flex, rowStyle, backgroundColor,width,height,alignItems],
  );

  return touchable 
  ? <TouchableOpacity style={styles.rowStyles} onPress={onPress}>{children}</TouchableOpacity> 
  :  <View style={styles.rowStyles}>{children}</View>;
}

RowComponent.defaultProps = {
  rowStyle: {},
  flex: 0,
  backgroundColor: 'transparent',
  alignItems: 'center',
  width: null,
  height: null,
  touchable: false,
  onPress: () => {}
};

RowComponent.propTypes = {
  rowStyle: propTypes.shape({}),
  flex: propTypes.number,
  backgroundColor: propTypes.string,
  alignItems: propTypes.string,
  width: propTypes.any ,
  height: propTypes.any,
  touchable: propTypes.bool,
  onPress: propTypes.func,
};

export default RowComponent;
