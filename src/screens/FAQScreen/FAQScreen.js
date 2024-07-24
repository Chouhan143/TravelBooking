import React, { useMemo } from "react";
import { View, KeyboardAvoidingView, FlatList,Text } from "react-native";
import { HelpScreenStyles, Style } from '../../styles';
import { Spacing,FAQData,Search } from '../../components';
import { SH,SF,Colors } from '../../utils';
import { ScrollView } from 'react-native-virtualized-view';
import { useNavigation, useTheme } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo'
const FAQScreen = () => {
    const { Colors } = useTheme();
    const navigation=useNavigation();
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
        <View style={{flex:1,backgroundColor:'white'}}>
        <View style={{display:'flex',flexDirection:'row',marginLeft:SH(20),marginVertical:SH(15)}}>
        <Entypo name={'menu'} color={Colors.theme_background} size={35} onPress={()=>navigation.navigate("Root")}/>
        <Text style={{color:Colors.theme_background,fontSize:SF(25)}}>FAQ</Text>
        </View>
            <ScrollView nestedScrollEnabled={true}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={Style.ScrollViewStyles}>
                <KeyboardAvoidingView enabled>
                    <View style={HelpScreenStyle.MinFlexView}>
                        <View style={HelpScreenStyle.MinViewAllContent}>
                            <Spacing space={SH(10)} />
                            <View style={HelpScreenStyle.PaddingsHorozonrtal}>
                            <View style={HelpScreenStyle.BorderWidth}>
                                <Search />
                            </View>
                            </View>
                            <Spacing space={SH(30)} />
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
                        <Spacing space={SH(30)} />
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    );
};
export default FAQScreen;
