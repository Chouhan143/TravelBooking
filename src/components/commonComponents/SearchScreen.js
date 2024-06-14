import React, { useState,useMemo } from 'react';
import { TouchableOpacity ,TextInput} from "react-native";
import { SF,Colors, SW, SH } from '../../utils';
import { Input, VectorIcon } from '../../components';
import { Style } from '../../styles';
import { useTranslation } from "react-i18next";

const SearchScreenset = (props) => {
    const [mobileNumber, setMobileNumber] = useState('');
    const { t } = useTranslation();
  
    return (
        <TouchableOpacity style={{display:'flex',flexDirection:'row',alignItems:'center',padding:SW(5)}}>
        <VectorIcon name="search1" icon="AntDesign" color={Colors.theme_background} size={SF(20)} />
            <TextInput
                placeholder={t("Search Here ")}
                onChangeText={(value) => setMobileNumber(value)}
                value={mobileNumber}
                placeholderTextColor={Colors.theme_background}
                maxLength={10}
                style={{width:SW(310)}}
            />
        </TouchableOpacity>
    );
};
export default SearchScreenset;
