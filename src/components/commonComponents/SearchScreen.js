import React, { useState,useMemo } from 'react';
import { TouchableOpacity } from "react-native";
import { SF,Colors } from '../../utils';
import { Input, VectorIcon } from '../../components';
import { Style } from '../../styles';
import { useTranslation } from "react-i18next";

const SearchScreenset = (props) => {
    const [mobileNumber, setMobileNumber] = useState('');
    const { t } = useTranslation();
  
    return (
        <TouchableOpacity style={Style.WidthSet}>
            <Input
                placeholder={t("Search Here ")}
                onChangeText={(value) => setMobileNumber(value)}
                value={mobileNumber}
                placeholderTextColor={Colors.black_text_color}
                maxLength={10}
                leftIcon={<VectorIcon name="search1" icon="AntDesign" color={Colors.black_text_color} size={SF(20)} />}
                inputStyle={Style.SearchInputBorder}
            />
        </TouchableOpacity>
    );
};
export default SearchScreenset;
