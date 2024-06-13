import React from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { Colors,SH } from '../../utils';

const VectorIcon = (props) => {
    const {height, refRBSheet, children } = { ...props };

    return (
        <RBSheet
            ref={refRBSheet}
            closeOnDragDown={true}
            height={height}
            dragFromTopOnly={true}
            closeOnPressMask={true}
            customStyles={{
                wrapper: {
                    backgroundColor: Colors.Rgb_Black,
                },
                draggableIcon: {
                    backgroundColor: Colors.black_text_color,
                },
                container: {
                    borderTopLeftRadius: SH(15),
                    borderTopRightRadius: SH(15),
                    paddingTop:SH(20),
                    paddingBottom:SH(5)
                }
            }}
        >
            {children}
        </RBSheet>
    )
}
export default VectorIcon;