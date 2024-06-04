import React, {useState} from 'react';
import OTPInputView from '@twotalltotems/react-native-otp-input';

function OTPInput(props) {
  const {
    style,
    pinCount,
    autoFocusOnLoad,
    codeInputFieldStyle,
    codeInputHighlightStyle,
    onCodeChanged,
  } = props;
  const [code, setCode] = useState('');
  const handleChange = otp => {
    setCode(otp);
    if (onCodeChanged) {
      onCodeChanged(otp);
    }
  };

  // const { style, pinCount, autoFocusOnLoad, codeInputFieldStyle, codeInputHighlightStyle } = props;
  return (
    <OTPInputView
      style={style}
      pinCount={pinCount}
      autoFocusOnLoad={autoFocusOnLoad}
      codeInputFieldStyle={codeInputFieldStyle}
      codeInputHighlightStyle={codeInputHighlightStyle}
      onCodeChanged={handleChange}
      code={code}
    />
  );
}
export default OTPInput;
