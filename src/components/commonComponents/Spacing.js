import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import propTypes from 'prop-types';

function Spacing({space, horizontal, backgroundColor}) {
  const styles = useMemo(
    () =>
      StyleSheet.create({
        spacerStyle: {
          [horizontal ? 'width' : 'height']: space,
          backgroundColor: backgroundColor || 'transparent',
        },
      }),
    [horizontal, space, backgroundColor],
  );

  return <View style={[styles.spacerStyle]} />;
};

Spacing.defaultProps = {
  space: 10,
  horizontal: false,
  backgroundColor: 'transparent',
};

Spacing.propTypes = {
  space: propTypes.number || propTypes.string,
  horizontal: propTypes.bool,
  backgroundColor: propTypes.string,
};

export default Spacing;
