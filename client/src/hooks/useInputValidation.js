import { useState } from "react";

// utils
import { MAX_PHONE_SIZE } from "../utils/staticConstants";

const useInputValidation = (defaultValue, inputRef) => {
  const [inputValue, setInputValue] = useState(defaultValue);
  
  const numberOnly = (str = "", replaceValue = "") => {
    return str.replace(/\D/g, replaceValue);
  };

  const toPhoneNumberFormat = (str = "") => {
    if (!str) {
      return "";
    }

    const numberOnlyStr = numberOnly(str);
    const phoneStrArray = [];
    for (let i = 0; i < numberOnlyStr.length; i++) {
      if (i === 4) {
        phoneStrArray.push("-");
      } else if (i === 7) {
        phoneStrArray.push("-");
      }
      phoneStrArray.push(numberOnlyStr.charAt(i));
    }
    return str ? phoneStrArray.join("") : "";
  };

  const handleInputChange = (event) => {
    const targetValue = event.target.value || "";
    const numberOnlyValue = numberOnly(targetValue);
    const cursorPosition = event.target.selectionStart;

    if (
      numberOnlyValue.length <= MAX_PHONE_SIZE &&
      targetValue.match(/^[\d()-]+$/g)
    ) {
      const formattedPhone = toPhoneNumberFormat(targetValue)
      setInputValue(formattedPhone);

      setTimeout(() => {
        if (inputRef.current && cursorPosition < targetValue.length) {
          inputRef.current.setSelectionRange(cursorPosition, cursorPosition);
        }
      }, 0);
      return formattedPhone;
    } else if (!targetValue) {
      setInputValue("");
    }
    return "";
  };

  return {
    toPhoneNumberFormat, // can be used by others
    inputValue,
    onChangeValue: handleInputChange,
  };
};

export default useInputValidation;
