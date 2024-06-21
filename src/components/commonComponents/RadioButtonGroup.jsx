import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { SF, SW,SH, Colors} from '../../utils';
const RadioButtonGroup= ({ label, selected, onPress }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={[styles.radioButton, selected && styles.radioButtonSelected]}>
                {selected && <FontAwesome name="circle" size={13} color="white" />}
            </View>
            <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
    );
};

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
    },
    radioButtonSelected: {
        backgroundColor: Colors.theme_background,
    },
    label: {
        marginLeft: SW(10),
        fontSize: SF(15),
        color: 'black',
        fontFamily:'Poppins-Regular',
        textTransform:'capitalize'
    },
});

export default RadioButtonGroup;

