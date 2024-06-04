import React, { useState } from 'react';
import '../../screens/Authantication/SelectLanguage/i18n';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Modal, VectorIcon, LanguageSelectFlat, } from '../../components';
import { LanguageStyles } from '../../styles';
import { Colors, SF } from '../../utils';

const ModalLanguage = (props) => {
    const { modalVisible, setModalVisible, close, changeLang } = props;
    const { t, i18n } = useTranslation();
    const [isFocus, setIsFocus] = useState(false);
    const [IconChange, SetIconChange] = useState('');
    const [selectLanguage, setSelectLanguage] = useState('en');
    const [selectLabel, setSelectLabel] = useState('');

    const LanguageDropdownData = [
        { label: "English", value: 'en' },
        { label: "Arabic", value: 'ara' },
        { label: "Spanish", value: 'Spa' },
        { label: "French", value: 'Fr' },
      ];

    return (
        <Modal
            modalVisible={modalVisible}
            setModalVisible={() => setModalVisible()}
            close={() => close()}>
            <View style={LanguageStyles.LanguageViewStyleModal}>
                <View style={LanguageStyles.FlexViewStyle}>
                    <TouchableOpacity style={LanguageStyles.CloseButtonStyle} onPress={() => {
                        setModalVisible(false);
                    }}>
                        <VectorIcon name="window-close" icon="FontAwesome" size={SF(35)} color={Colors.theme_background} />
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={LanguageDropdownData}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => (< LanguageSelectFlat item={item} index={index} setIsFocus={setIsFocus}
                        IconChange={IconChange}
                        selectLanguage={selectLanguage}
                        selectLabel={selectLabel}
                        setSelectLanguage={setSelectLanguage}
                        SetIconChange={SetIconChange}
                        onPress={() => {
                            setSelectLanguage(item.value);
                            setSelectLabel(item.label);
                            SetIconChange(index);
                            setModalVisible(false);
                            changeLang(item.label)
                        }}
                    />)}
                />
            </View>
        </Modal>
    )
}

export default ModalLanguage;