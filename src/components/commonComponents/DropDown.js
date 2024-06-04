import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Colors, SF, SH, SW } from '../../utils';
import IconF from 'react-native-vector-icons/Entypo';

function DropdownComponent({
    width,
    data,
    labelField,
    valueField,
    placeholder,
    searchPlaceholder,
    onChange,
    maxHeight,
    value,
    labelStyle,
    placeholderStyle,
    selectedTextStyle,
    dropdownStyle
}) {
    const styles = useMemo(
        () =>
            StyleSheet.create({
                container: { width: width },
                dropdownStyle: {
                    borderWidth: SH(1),
                    borderColor: Colors.input_border,
                    borderRadius: SH(8),
                    fontSize: SF(14),
                    lineHeight: SF(17),
                    color: Colors.black_text_color,
                    fontWeight: '400',
                    padding: SH(5),
                    height: SH(47),
                    ...dropdownStyle
                },
                icon: {
                    paddingRight: SH(5),
                },
                label: {
                    position: 'absolute',
                    backgroundColor: Colors.white_text_color,
                    paddingHorizontal: SH(8),
                    fontSize: SF(20),
                    color: Colors.gray_text_color,
                    ...labelStyle
                },
                placeholderStyle: {
                    fontSize: SF(18),
                    lineHeight: SF(21),
                    color: Colors.gray_text_color,
                    ...placeholderStyle
                },
                selectedTextStyle: {
                    fontSize: SF(18),
                    color:Colors.theme_background,
                    ...selectedTextStyle
                },
                IconStyle: {
                    width: SW(20),
                    height: SH(20),
                },
                ItemTextStyle: {
                    color: Colors.black_text_color
                }
            }),
        [dropdownStyle, labelStyle, placeholder, selectedTextStyle]
    )

    return (
        <View style={styles.container}>
            <Dropdown
                style={styles.dropdownStyle}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                IconStyle={styles.IconStyle}
                data={data}
                searchPlaceholder={searchPlaceholder}
                maxHeight={maxHeight}
                renderRightIcon={() => (
                    <IconF
                      style={styles.icon}
                      color="black"
                      name="chevron-down"
                      size={SF(20)}
                    />
                  )}
                labelField={labelField}
                valueField={valueField}
                placeholder={placeholder}
                value={value}
                onChange={onChange} 
                itemTextStyle={styles.ItemTextStyle}
                />
        </View>
    );
};

export default DropdownComponent;
