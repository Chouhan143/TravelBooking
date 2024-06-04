import React, {useMemo} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {SF} from '../../utils';
import {HomeTabStyle} from '../../styles';
import {VectorIcon} from '../../components';
import {useTheme} from '@react-navigation/native';

const WhatsNewFun = props => {
  const {item, onPress} = props;
  const {Colors} = useTheme();
  const HomeTabStyles = useMemo(() => HomeTabStyle(Colors), [Colors]);
  return (
    <TouchableOpacity
      style={HomeTabStyles.ExclusiveImgWrap}
      onPress={() => onPress(item.id)}>
      <Image
        resizeMode="cover"
        style={HomeTabStyles.ExclusiveImg}
        source={{uri: item.slider_img}}
      />
      <View style={HomeTabStyles.OffreView}>
        <VectorIcon
          icon="AntDesign"
          name="arrowright"
          size={SF(25)}
          style={HomeTabStyles.KnowMoreIcon}
          color={Colors.white_text_color}
        />
      </View>
    </TouchableOpacity>
  );
};
export default WhatsNewFun;
