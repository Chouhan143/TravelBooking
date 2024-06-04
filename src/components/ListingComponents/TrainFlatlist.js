import React from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { TrainListingStyle } from '../../styles';
import { VectorIcon } from "../../components";
import { SF, Colors } from "../../utils";

const TrainFlatlist = (props) => {
    const { item, onPress } = props;
    return (
        <View style={TrainListingStyle.TraiBoxWraper}>
            <View style={TrainListingStyle.TrainInfoBox}>
                <View style={TrainListingStyle.trainNumberBox}>
                    <Text style={TrainListingStyle.trainNumber}>{item.trainNumber}</Text>
                </View>
                <View style={TrainListingStyle.TrainInfoBox}><Text style={TrainListingStyle.TrainNameText}>{item.TrainName}</Text><VectorIcon icon="AntDesign" name="right" color={Colors.black_text_color} style={TrainListingStyle.IconRightset} /></View>
            </View>
            <View style={TrainListingStyle.TrainTimeJopurney}>
                <View>
                    <Text style={TrainListingStyle.FromTimetext}>{item.FromTime}</Text>
                    <Text style={TrainListingStyle.FromDeparNameText}>{item.FromDeparName}</Text>
                </View>
                <Text style={TrainListingStyle.busComonStyle}>{item.TravelTime}</Text>
                <View style={TrainListingStyle.RightAlin}>
                    <Text style={TrainListingStyle.FromTimetext}>{item.EndTime}</Text>
                    <Text style={TrainListingStyle.FromDeparNameText}>{item.EndDeparName}</Text>
                </View>
            </View>
            <View>
                <Text style={TrainListingStyle.SeatAvlbtText}>Seats Avialability</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={TrainListingStyle.TrainModeBoxWrap}>
                        <View>
                            <TouchableOpacity style={TrainListingStyle.TrainModeBox} onPress={() => onPress()}>
                                <Text style={TrainListingStyle.TrainMode}>Ac 2Tier (2A)</Text>
                                <Text style={TrainListingStyle.TrainModeAmount}><VectorIcon icon="FontAwesome" name="rupee" color={Colors.black_text_color} size={SF(10)} /> 635</Text>
                                <Text style={TrainListingStyle.AvialablilityTickit}>available-0025</Text>
                                <View style={TrainListingStyle.TrainTatkalBox}>
                                    <Text style={TrainListingStyle.TrainTatkalText}>TATKAL</Text>
                                </View>
                            </TouchableOpacity>
                            <Text style={TrainListingStyle.Trainminago}>34 mins ago</Text>
                        </View>
                        <View>
                            <TouchableOpacity style={TrainListingStyle.TrainModeBoxTwo} onPress={() => onPress()}>
                                <Text style={TrainListingStyle.TrainMode}>Sleeper Class (SL)</Text>
                                <Text style={TrainListingStyle.TrainModeAmount}><VectorIcon icon="FontAwesome" color={Colors.black_text_color} size={SF(10)} /> 2910</Text>
                                <Text style={TrainListingStyle.AvialablilityTickitTwo}>RLWL161/WL79</Text>
                            </TouchableOpacity>
                            <Text style={TrainListingStyle.Trainminago}>44 mins ago</Text>
                        </View>
                        <View>
                            <TouchableOpacity style={TrainListingStyle.TrainModeBox} onPress={() => onPress()}>
                                <Text style={TrainListingStyle.TrainMode}>Ac 2Tier (2A)</Text>
                                <Text style={TrainListingStyle.TrainModeAmount}><VectorIcon icon="FontAwesome" color={Colors.black_text_color} size={SF(10)} /> 2910</Text>
                                <Text style={TrainListingStyle.AvialablilityTickitTwo}>TQWL8/WL8</Text>
                                <View style={TrainListingStyle.TrainTatkalBox}>
                                    <Text style={TrainListingStyle.TrainTatkalText}>TATKAL</Text>
                                </View>
                            </TouchableOpacity>
                            <Text style={TrainListingStyle.Trainminago}>34 mins ago</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
            <View style={TrainListingStyle.LinkBox}>
                <Text style={TrainListingStyle.LinkBoxtext}>{item.CheckAvialbl}</Text>
            </View>
        </View>
    )
};
export default TrainFlatlist;