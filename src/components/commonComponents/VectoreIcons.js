import React from "react";
import IconF from 'react-native-vector-icons/Feather';
import IconA from 'react-native-vector-icons/AntDesign';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import IconL from 'react-native-vector-icons/MaterialIcons';
import IconT from 'react-native-vector-icons/FontAwesome';
import IconE from 'react-native-vector-icons/EvilIcons';
import IconJ from 'react-native-vector-icons/Entypo';
import IconG from 'react-native-vector-icons/Ionicons';
import IconP from 'react-native-vector-icons/Octicons';
import IconW from 'react-native-vector-icons/FontAwesome5';
import IconV from 'react-native-vector-icons/Fontisto';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
const VectorIcon = (props) => {
    const { icon = "", name, color, size, style } = props
    return (
        icon == "FontAwesome6" ?
        <FontAwesome6 name={name} color={color} style={style} size={size} />
        :
        icon == "Feather" ?
            <IconF name={name} color={color} style={style} size={size} />
            :
            icon == "AntDesign" ?
                <IconA name={name} color={color} style={style} size={size} />
                :
                icon == "Fontisto" ?
                    <IconV name={name} color={color} style={style} size={size} />
                    :
                    icon == "MaterialCommunityIcons" ?
                        <IconM name={name} color={color} size={size} />
                        :
                        icon == "FontAwesome" ?
                            <IconT name={name} color={color} style={style} size={size} />
                            :
                            icon == "EvilIcons" ?
                                <IconE name={name} color={color} style={style} size={size} />
                                :
                                icon == "Entypo" ?
                                    <IconJ name={name} color={color} style={style} size={size} />
                                    :
                                    icon == "Ionicons" ?
                                        <IconG name={name} color={color} style={style} size={size} />
                                        :
                                        icon == "Octicons" ?
                                            <IconP name={name} color={color} style={style} size={size} />
                                            :
                                            icon == "FontAwesome5" ?
                                                <IconW name={name} color={color} style={style} size={size} />
                                                :
                                                icon == "MaterialIcons" ?
                                                    <IconL name={name} color={color} style={style} size={size} />
                                                    : null
    )
}
export default VectorIcon;