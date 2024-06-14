import React, {useMemo} from 'react';
import propTypes from 'prop-types';
import {View, StyleSheet} from 'react-native';
import {SF, SH, SW, Fonts, Colors} from '../../utils';
import {Input} from 'react-native-elements';

function Inputs({
  title,
  placeholder,
  titleStyle,
  inputStyle,
  onChangeText,
  value,
  inputprops,
  onBlur,
  onFocus,
  inputType,
  autoFocus,
  secureTextEntry,
  maxLength,
  leftIcon = {},
  rightIcon = {},
  errorMessage = '',
  disabled = false,
  required = false,
  containerStyle,
  onEndEditing,
  inputContainerStyle,
  numberOfLines,
  
}) {
  const colorsset = Colors;
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {width: '100%', ...containerStyle, marginBottom: SH(0)},
        inputContainerStyle: {
          borderBottomWidth: SH(0),
          width: '100%',
          ...inputContainerStyle,
        },
        input_style: {
          width: '100%',
          borderColor: '#bfbdbd',
          fontSize: SF(17),
          fontWeight: '600',
          marginBottom: SH(0),
          fontFamily: Fonts.Poppins_Medium,
          color: colorsset.black_text_color,
          paddingVertical: SH(8),
          paddingHorizontal: SH(10),
          fontFamily: Fonts.Poppins_Regular,
          borderRadius: SH(7),
          borderWidth: SH(1),
          ...inputStyle,
        },
        labelStyle: {
          width: '100%',
          fontSize: SF(18),
          color: colorsset.black_text_color,
          fontFamily: Fonts.Poppins_Medium,
          paddingHorizontal: SW(5),
          ...titleStyle,
          fontWeight: '500',
          paddingVertical: SH(2),
        },
        placeholderStyle: {
          fontSize: SF(19),
          color: Colors.theme_background,
          fontFamily: Fonts.Poppins_Medium,
        },
        errorStyle: {
          color: colorsset.theme_background,
          fontFamily: Fonts.Poppins_Regular,
        },
      }),
    [title, titleStyle, inputStyle, colorsset],
  );
  return (
    <View style={styles.container}>
      <Input
        label={title + (required ? '*' : '')}
        placeholder={placeholder}
        onChangeText={text => onChangeText(text)}
        leftIcon={leftIcon}
        placeholderTextColor={Colors.theme_background}
        rightIcon={rightIcon}
        numberOfLines={numberOfLines}
        errorMessage={errorMessage}
        disabled={disabled}
        onFocus={() => onFocus()}
        onBlur={() => onBlur()}
        autoFocus={autoFocus}
        keyboardType={!inputType ? 'default' : inputType}
        secureTextEntry={secureTextEntry}
        value={value}
        selectionColor={colorsset.theme_background}
        maxLength={maxLength}
        {...inputprops}
        errorStyle={styles.errorStyle}
        inputStyle={styles.input_style}
        labelStyle={styles.labelStyle}
        inputContainerStyle={styles.inputContainerStyle}
        onEndEditing={e => onEndEditing(e)}
      />
    </View>
  );
}

Inputs.defaultProps = {
  title: '',
  placeholder: '',
  titleStyle: {},
  inputStyle: {},
  onChangeText: () => {},
  onFocus: () => {},
  onBlur: () => {},
  value: '',
  textprops: {},
  inputprops: {},
  inputType: null,
  autoCompleteType: '',
  onEndEditing: () => {},
};

Inputs.propTypes = {
  title: propTypes.string,
  autoCompleteType: propTypes.string,
  placeholder: propTypes.string,
  titleStyle: propTypes.shape({}),
  inputStyle: propTypes.shape({}),
  onChangeText: propTypes.func,
  value: propTypes.string,
  textprops: propTypes.object,
  inputprops: propTypes.object,
  onFocus: propTypes.func,
  onBlur: propTypes.func,
  inputType: propTypes.any,
  onEndEditing: propTypes.func,
};

export default Inputs;
