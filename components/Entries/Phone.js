import { useState } from "react";
import PhoneInput from "react-native-phone-number-input";

const PhoneEntry = ({ value, setValue }) => {
  const [formattedValue, setFormattedValue] = useState("");

  return (
    <PhoneInput
      autoFocus
      // withDarkTheme
      // withShadow
      layout="first"
      // placeholder="987654321"
      placeholder="Phone number"
      // ...
      containerStyle={{ width: "100%", height: 60, borderColor: "rgba(0, 25, 39, 0.4)", borderStyle: "solid", borderWidth: 1, borderRadius: 3 }}
      textContainerStyle={{}}
      // ...
      defaultCode="DZ"
      defaultValue={value}
      onChangeText={(text) => {
        setValue(text);
      }}
      onChangeFormattedText={(text) => {
        setFormattedValue(text);
      }}
    />
  );
};

export default PhoneEntry;
