import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import React, { useState } from 'react';
import { SH, SW } from '../../utils';
import { RadioButton } from 'react-native-paper';

const AgeData = [
    { key: 1, text: 'age needed' },
    { key: 2, text: '0 years old' },
    { key: 3, text: '1 years old ' },
    { key: 4, text: '2 years old' },
    { key: 5, text: '3 years old' },
    { key: 6, text: '4 years old' },
    { key: 7, text: '5 years old' },
    { key: 8, text: '6 years old' },
    { key: 9, text: '7 years old' },
    { key: 10, text: '8 years old' },
    { key: 11, text: '9 years old' },
    { key: 12, text: '10 years old' },
    { key: 13, text: '11 years old' },
    { key: 14, text: '12 years old' },
    { key: 15, text: '13 years old' },
    { key: 16, text: '14 years old' },
    { key: 17, text: '15 years old' },
    { key: 18, text: '16 years old' },
    { key: 19, text: '17 years old' },
];

const AgeModal = ({ SetModalVisible2 }) => {
    const [selectedAge, setSelectedAge] = useState(null);

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.ageItem} onPress={() => setSelectedAge(item)}>
                <Text style={{ color: 'black' }}>{item.text}</Text>
                <RadioButton
                    value={item.key}
                    status={selectedAge === item.key ? 'checked' : 'unchecked'}
                    onPress={() => setSelectedAge(item.key)}
                />
            </TouchableOpacity>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={AgeData}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
            <TouchableOpacity onPress={() => SetModalVisible2(false)}>
                <Text style={{ color: 'black' }}>Close</Text>
            </TouchableOpacity>
        </View>
    );
}

export default AgeModal;

const styles = StyleSheet.create({
    container: {
        padding: SW(20),
        alignItems: 'center',
        backgroundColor: 'white',
        marginTop: SH(150)
    },
    ageItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingVertical: SH(10),
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    }
});
