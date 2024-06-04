import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react';
import { Colors, SF } from '../../utils';
import { VectorIcon } from '../../components';
import { LanguageStyles } from '../../styles';
import { useTranslation } from 'react-i18next';

const LanguageSelectFlat = (props) => {
    const { t, i18n } = useTranslation();
    const changeLanguage = data => {
       
        i18n
            .changeLanguage(data)
            .catch(err => console.log(err));
        {
            setIsFocus(false);
        }
    };
    const { onPress, setSelectLanguage, item, index, IconChange, setIsFocus, SetIconChange } = props;
    return (
        <TouchableOpacity style={LanguageStyles.LanguageMinView} onPress={() => {
            setSelectLanguage(item.value); changeLanguage(item.value);
            SetIconChange(index); onPress();
        }}>
            <View>
                <Text style={LanguageStyles.TextStyle}>{t(item.label)}</Text>
            </View>
            <View>
                <VectorIcon icon="Fontisto" name={IconChange == index ? 'radio-btn-active' : 'radio-btn-passive'} color={Colors.theme_background} size={SF(25)} />
            </View>
        </TouchableOpacity>
    )
}
export default LanguageSelectFlat;