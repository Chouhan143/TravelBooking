import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors, SF, SH, SW } from '../../utils';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ReadMoreText from '../../components/commonComponents/ReadMore';
const HotelDetails = {
    PolicyAndInstruction: [
        {
            Name: "POLICIES",
            Data: [
                {
                    SubName: "Know before you go",
                    Detail: [
                        "Local laws may restrict unmarried guests from sharing rooms. Guests are responsible for providing proof of marriage, if requested by the property.",
                        "Only registered guests are allowed in the guestrooms.",
                        "This property advises that enhanced cleaning and guest safety measures are currently in place.The property is cleaned and disinfected using an electrostatic sprayer; disinfectant is used to clean the property; bed sheets and towels are laundered at a temperature of at least 60°C/140°F; guestroom doors are sealed after cleaning.Social distancing measures are in place; staff at the property wear personal protective equipment; a shield is in place between staff and guests in main contact areas; periodic temperature checks are conducted on staff; temperature checks are available to guests; guests are provided with hand sanitizer; cashless payment methods are available for all transactions; masks are required in public areas.Contactless check-in and contactless check-out are available.Enhanced food service safety measures are in place.Each guestroom is kept vacant for a minimum of 24 hours between bookings.This property affirms that it adheres to the cleaning and disinfection practices of Safe Travels (WTTC - Global)."
                    ]
                }
            ]
        },
        {
            Name: "CHECKIN INSTRUCTIONS",
            Data: [
                {
                    SubName: "Special Instructions",
                    Detail: [
                        "This property offers transfers from the airport. To arrange pick-up, guests must contact the property 24 hours prior to arrival, using the contact information on the booking confirmation. Front desk staff will greet guests on arrival.",
                        "To register at this property, guests who are Indian citizens must provide a valid photo identity card issued by the Government of India; travelers who are not citizens of India must present a valid passport and visa."
                    ]
                },
                {
                    SubName: "Instructions",
                    Detail: [
                        "Extra-person charges may apply and vary depending on property policyGovernment-issued photo identification and a credit card, debit card, or cash deposit may be required at check-in for incidental chargesSpecial requests are subject to availability upon check-in and may incur additional charges; special requests cannot be guaranteedSafety features at this property include a fire extinguisher, a security system, a first aid kit, and window guardsBe prepared: check the latest COVID-19 travel requirements and measures in place for this destination before you travel.Please note that cultural norms and guest policies may differ by country and by property; the policies listed are provided by the property."
                    ]
                }
            ]
        },
    ],
    Price: "765",
};

export default function HotelMoreDetails() {
    return (
        <View style={styles.container}>
            <ScrollView style={{ padding: SW(20)}}>
                {HotelDetails.PolicyAndInstruction.map((item, index) => (
                    <View key={index}>
                        <Text style={styles.sectionTitle}>{item.Name}</Text>
                        {item.Data.map((data, idx) => (
                            <View key={idx} style={styles.subSectionContainer}>
                                <Text style={styles.subSectionTitle}>{data.SubName}</Text>
                                {data.Detail.map((detail, detailIdx) => (
                                    <ReadMoreText
                                    key={detailIdx}
                                    text={detail}
                                    textStyle={{
                                      color: 'gray', fontFamily: 'Poppins-Regular',
                                      fontSize: SF(13), marginLeft: 0
                                    }}
                                    readMoreStyle={{
                                      color: Colors.theme_background, fontFamily: 'Poppins-Bold',
                                      fontSize: SF(13), marginLeft: 0, marginTop: SH(5)
                                    }}
                                    />
                                ))}
                            </View>
                        ))}
                    </View>
                ))}
            </ScrollView>
            <TouchableOpacity style={{
                padding: SH(20), backgroundColor: Colors.theme_background,
                display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
            }}>
                <Text style={{ color: 'white', marginRight: SW(6) }}>Pay</Text>
                <FontAwesome name={'rupee'} size={15} color='white' style={{ marginLeft: SW(6) }} />
                <Text style={{ color: 'white', marginLeft: SW(7) }}>
                    {HotelDetails.Price}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 0
    },
    sectionTitle: {
        fontSize: SF(20),
        fontFamily: 'Poppins-Bold',
        marginBottom: SH(10),
        color: 'black'
    },
    subSectionContainer: {
        marginBottom: SH(25)
    },
    subSectionTitle: {
        fontSize: SF(18),
        fontFamily: 'Poppins-Regular',
        marginBottom: 4,
        color: 'black'
    },
    detailText: {
        fontSize: SF(12),
        color: 'gray',
        marginBottom: 4
    }
});
