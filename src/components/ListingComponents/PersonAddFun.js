import React, {useState, useMemo} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {BookingTabStyle} from '../../styles';
import {VectorIcon} from '../../components';
import {SF} from '../../utils';
import {useTheme} from '@react-navigation/native';

const PersonAddFun = props => {
  const {Title, Subtitle, TitleIcon, Icon, onCounterChange} = props;
  const [value, setValue] = useState(0);
  const DecreseFun = () => {
    {
      value > '0' && setValue(value - 1);
      onCounterChange(value - 1);
    }
  };
  const IncreaseFun = () => {
    setValue(value + 1);
    onCounterChange(value + 1);
  };
  const {Colors} = useTheme();
  const BookingTabStyles = useMemo(() => BookingTabStyle(Colors), [Colors]);
  return (
    <View style={BookingTabStyles.SelectPersonBoxChild}>
      <VectorIcon
        icon={Icon}
        name={TitleIcon}
        size={SF(20)}
        color={Colors.black_text_color}
      />
      <Text style={BookingTabStyles.Adultstext}>{Title}</Text>
      <Text style={BookingTabStyles.AdultstextYears}>{Subtitle}</Text>
      <View style={BookingTabStyles.FlexRow}>
        <TouchableOpacity onPress={() => DecreseFun()}>
          <VectorIcon
            icon="AntDesign"
            name="minuscircleo"
            size={SF(20)}
            style={[BookingTabStyles.IconCommon, BookingTabStyles.minusColor]}
          />
        </TouchableOpacity>
        <Text style={BookingTabStyles.totalStyle}>{value}</Text>
        <TouchableOpacity onPress={() => IncreaseFun()}>
          <VectorIcon
            icon="AntDesign"
            name="pluscircleo"
            size={SF(20)}
            style={[BookingTabStyles.IconCommon, BookingTabStyles.plusColor]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PersonAddFun;
