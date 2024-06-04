import React, { useState, useMemo } from "react";
import { Text, View } from "react-native";
import { BookingTabStyle } from '../../styles';
import { DropDown, Button, Spacing, AcListFun, DatePicker } from '../../components';
import { SH } from "../../utils";
import { useTheme } from '@react-navigation/native';
import { useTranslation } from "react-i18next";

const TrainTab = (props) => {
    const { onPress } = props;
    const { t } = useTranslation();
    const { Colors } = useTheme();
    const BookingTabStyles = useMemo(() => BookingTabStyle(Colors), [Colors]);
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const FlightData = [
        { label: t('Delhi'), value: '1' },
        { label: t('Bengaluru'), value: '2' },
        { label: t('Mumbai'), value: '3' },
        { label: t('Dubai'), value: '4' },
        { label: t('hyderabad'), value: '5' },
        { label: t('Kolkata'), value: '6' },
        { label: t('Bangkok'), value: '7' },
        { label: t('Patna'), value: '8' },
        { label: t('Chennai'), value: '9' },
        { label: t('Kathmandu'), value: '10' },
        { label: t('Ahmedabad'), value: '11' },
        { label: t('Doha'), value: '12' },
        { label: t('Pune'), value: '13' },
        { label: t('Singapore'), value: '14' },
        { label: t('Muscat'), value: '15' },
        { label: t('Lucknow'), value: '16' },
        { label: t('Jaipur'), value: '17' },
        { label: t('Kuwait'), value: '18' },
        { label: t('Sharjah'), value: '19' },
        { label: t('Goa'), value: '20' },
    ];

    return (
        <View>
            <View>
                <View style={BookingTabStyles.FlightMainBox}>
                    <View style={BookingTabStyles.WithFrom}>
                        <Text style={BookingTabStyles.FromText}>{t("From")}</Text>
                        <DropDown
                            style={[BookingTabStyles.dropdown, isFocus && { borderColor: Colors.blue_color }]}
                            data={FlightData}
                            search
                            maxHeight={SH(300)}
                            labelField="label"
                            valueField="value"
                            searchPlaceholder={t("Search")}
                            value={'1'}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={item => {
                                setValue(item.value);
                                setIsFocus(false);
                            }}
                            dropdownStyle={BookingTabStyles.dropdownStyleTwo}
                        />
                    </View>
                    <View style={BookingTabStyles.WithFrom}>
                        <Text style={BookingTabStyles.ToText}>{t("To")}</Text>
                        <DropDown
                            style={[BookingTabStyles.dropdown, isFocus && { borderColor: Colors.blue_color }]}
                            data={FlightData}
                            search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            searchPlaceholder={t("Search")}
                            value={'5'}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={item => {
                                setValue(item.value);
                                setIsFocus(false);
                            }}
                            dropdownStyle={BookingTabStyles.dropdownStyleTwo}
                        />
                    </View>
                </View>
                <View style={BookingTabStyles.FlewRows}>
                    <View style={BookingTabStyles.Departuredateview}>
                        <Text style={BookingTabStyles.Departuredatext}>Departure Date</Text>
                        <DatePicker />
                    </View>
                    <View style={BookingTabStyles.Departuredateview}>
                        <Text style={BookingTabStyles.Departuredatext}>Return Date</Text>
                        <DatePicker />
                    </View>
                </View>
                <Spacing space={SH(30)} />
                <View style={BookingTabStyles.BookingACBoxWrap}>
                    <AcListFun Title={t("AcNonAc")} />
                    <AcListFun Title={t("AConly")} />
                    <AcListFun Title={t("NonAc")} />
                </View>
                <Spacing space={SH(10)} />
                <Button title={t('Search_Trains')} onPress={() => onPress()} />
            </View>
        </View>
    );
};

export default TrainTab;