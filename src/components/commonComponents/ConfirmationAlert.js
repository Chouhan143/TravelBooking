import React from "react";
import { Modal, Text, View } from "react-native";
import { Style } from '../../styles';
import { Button, VectorIcon } from '../../components';
import propTypes from 'prop-types';
import { Colors, SF } from "../../utils";

function SweetaelertModal(props) {
    const { message, modalVisible, setModalVisible, buttonminview, onPress, onPressCancel, buttonText, cancelButtonText, iconVisible } = props;
    return <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
            setModalVisible(!modalVisible);
        }}
    >
        <View style={Style.setbgcolorgrsay}>
            <View style={Style.CenteredView}>
                <View style={Style.ModalView}>
                    {iconVisible &&
                        <View style={Style.setroundcenter}>
                            <View style={[Style.checkiconright, { borderColor: Colors.theme_background }]}>
                                <VectorIcon icon="AntDesign" style={Style.setbackgroundicon} color={Colors.theme_background} name="check" size={SF(45)} />
                            </View>
                        </View>
                    }
                    <View style={Style.registertextset}>
                        <Text style={Style.settext}>{message}</Text>
                    </View>
                    <View style={[Style.buttonminview, { ...buttonminview }]} >
                        <View style={Style.setokbutton}>
                            <Button title={buttonText}
                                onPress={() => { onPress && onPress() }}
                            />
                        </View>
                        {cancelButtonText ?
                            <View style={Style.setokbutton}>
                                <Button title={cancelButtonText}
                                    onPress={() => { onPressCancel() }}
                                />
                            </View>
                            : null
                        }
                    </View>
                </View>
            </View>
        </View>
    </Modal>;
}
SweetaelertModal.defaultProps = {
    message: '',
    setModalVisible: () => { },
    modalVisible: false,
    onPress: () => { },
    onPressCancel: () => { },
    buttonText: 'Ok',
    cancelButtonText: '',
    iconVisible: false
};
SweetaelertModal.propTypes = {
    message: propTypes.string,
    setModalVisible: propTypes.func,
    onPress: propTypes.func,
    onPressCancel: propTypes.func,
    buttonText: propTypes.string,
    cancelButtonText: propTypes.string,
};
export default SweetaelertModal;