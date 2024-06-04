import React, { useState, useMemo } from "react";
import { Text, View, TouchableOpacity, } from "react-native";
import { VectorIcon } from '../../components';
import { Colors, SF } from '../../utils';
import { LanguageStyles } from '../../styles';
import { useTranslation } from '@react-navigation/native';

const ChangeLanguageView = (props) => {
    const { t, i18n } = useTranslation();
    const { item, index } = props;
    const [Language, setLanguage] = useState('en');
    const [isFocus, setIsFocus] = useState(false);
    const [value, setValue] = useState('en');

    const changeLanguage = data => {
      
        i18n
            .changeLanguage(data)
            .then(() => setLanguage(data))
            .catch(err => console.log(err));
        {
            setValue(data);
            setIsFocus(false);
        }
    };

    return (
        <TouchableOpacity style={LanguageStyles.LanguageMinView} onPress={(text) => { setValue(text), changeLanguage(text) }}>
            <View>
                <Text style={LanguageStyles.TextStyle}>{item.text}</Text>
            </View>
            <View>
                <VectorIcon icon="Fontisto" name="radio-btn-active" color={Colors.theme_background} size={SF(25)} />
            </View>
        </TouchableOpacity>
    );
}
export default ChangeLanguageView;