import React, { useMemo } from "react";
import { View, KeyboardAvoidingView, FlatList } from "react-native";
import { HelpScreenStyles, Style } from '../../styles';
import { Spacing,FAQData,Search } from '../../components';
import { SH } from '../../utils';
import { ScrollView } from 'react-native-virtualized-view';
import { useTheme } from '@react-navigation/native';

const FAQScreen = () => {
    const { Colors } = useTheme();
    const HelpScreenStyle = useMemo(() => HelpScreenStyles(Colors), [Colors]);
   
    const Faqdataset = [
        {
          "id": 1,
          "paymentparegraph": "FAQ_paregraph_One",
          "smalltext": 'FAQ_paregraph_Two',
        },
        {
          "id": 2,
          "paymentparegraph": "FAQ_paregraph_Three",
          "smalltext": 'FAQ_paregraph_Four',
        },
        {
          "id": 3,
          "paymentparegraph": "FAQ_paregraph_Five",
          "smalltext": 'FAQ_paregraph_Six',
        },
        {
          "id": 4,
          "paymentparegraph": "FAQ_Paregraph_Saven",
          "smalltext": 'FAQ_Paregraph_Aeight',
        },
        {
          "id": 5,
          "paymentparegraph": "FAQ_Paregraph_Nine",
          "smalltext": 'FAQ_Paregraph_Ten',
        },
        {
          "id": 6,
          "paymentparegraph": "FAQ_Paregraph_Eleven",
          "smalltext": 'FAQ_One',
        },
        {
          "id": 7,
          "paymentparegraph": "FAQ_Two",
          "smalltext": 'FAQ_Three',
        },
        {
          "id": 8,
          "paymentparegraph": "FAQ_Four",
          "smalltext": 'FAQ_Five',
        },
      ]
      

    return (
        <View style={HelpScreenStyle.MinViewScreen}>
            <ScrollView nestedScrollEnabled={true}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={Style.ScrollViewStyles}>
                <KeyboardAvoidingView enabled>
                    <View style={HelpScreenStyle.MinFlexView}>
                        <View style={HelpScreenStyle.MinViewAllContent}>
                            <Spacing space={SH(20)} />
                            <View style={HelpScreenStyle.PaddingsHorozonrtal}>
                            <View style={HelpScreenStyle.BorderWidth}>
                                <Search />
                            </View>
                            </View>
                            <Spacing space={SH(20)} />
                            <FlatList
                                data={Faqdataset}
                                renderItem={({ item }) => (<FAQData
                                    item={item}
                                />)}
                                keyExtractor={item => item.id}
                                showsHorizontalScrollIndicator={false}
                                style={HelpScreenStyle.SetFlex}
                            />
                        </View>
                        <Spacing space={SH(50)} />
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    );
};
export default FAQScreen;
