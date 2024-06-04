import React, { useState } from "react";
import { Rating } from 'react-native-ratings';

function RatingScreen(props) {
  const { type, ratingColor, ratingBackgroundColor, ratingCount, tintColor, imageSize, startingValue, isDisabled, style } = props;
  return (
    <Rating
      type={type}
      ratingColor={ratingColor}
      ratingBackgroundColor={ratingBackgroundColor}
      ratingCount={ratingCount}
      tintColor={tintColor}
      imageSize={imageSize}
      startingValue={startingValue}
      isDisabled={isDisabled}
      style={style}
    />
  );
};
export default RatingScreen;