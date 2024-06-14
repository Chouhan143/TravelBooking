import React from 'react';
import { TouchableOpacity,StyleSheet } from 'react-native';
import { Colors, SF,SW,SH } from '../../utils';
import { VectorIcon } from '../../components';

function HeaderLeftMenuIcon(props) {
    const { navigation } = props;
    return (
        <TouchableOpacity style={{marginLeft:SW(15)}} onPress={() => navigation.toggleDrawer()}>
            <VectorIcon
                color={Colors.theme_background}
                name="navicon"
                icon="EvilIcons"
                size={SF(35)}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
})
export default HeaderLeftMenuIcon;