import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { SF, SW, SH, Colors } from '../../utils';

const RadioButtonGroup = ({ selected, label, onPress, iconName, additionalIcons = 0 }) => {
  const renderIcons = () => {
    let icons = [];
    for (let i = 0; i <= additionalIcons; i++) {
      icons.push(
        <FontAwesome5 key={i} name={iconName} size={18} color={selected ? 'black' : 'gray'} />
      );
    }
    return icons;
  };

  return (
    <TouchableOpacity onPress={onPress} style={{ flexDirection: 'row', alignItems: 'center'
        
     }}>
      <View style={[styles.radioButton, selected && styles.radioButtonSelected]}>
        {selected && <FontAwesome5 name="circle" size={13} color="white" />}
      </View>
      <Text style={styles.label}>{label}</Text>
      {renderIcons()}
    </TouchableOpacity>
  );
};

export default RadioButtonGroup;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SH(10),
  },
  radioButton: {
    height: SH(20),
    width: SW(20),
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.theme_background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SW(10),
  },
  radioButtonSelected: {
    backgroundColor: Colors.theme_background,
  },
  label: {
    marginLeft: SW(10),
    fontSize: SF(15),
    color: 'black',
    fontFamily: 'Poppins-Regular',
    textTransform: 'capitalize',
  },
});
