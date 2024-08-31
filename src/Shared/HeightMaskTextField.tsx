import React, { FC } from "react";
import { IMaskInput } from "react-imask";

export const MaskedInput: FC<any> = React.forwardRef(({ mask, onChange, ...other }, ref) => {
  const handleInputChange = (value: any, onChange: any) => {
    if (value && !value.endsWith('"')) {
      // Check if there are any numbers after the last '
      const lastApostropheIndex = value.lastIndexOf("'");
      if (lastApostropheIndex !== -1 && lastApostropheIndex < value.length - 1) {
        value += '"';
      }
    }

    onChange(value);
  };

  console.log("mask", mask);

  return (
    <IMaskInput
      {...other}
      mask={mask}
      definitions={{
        "#": /[0-9]/,
      }}
      inputRef={ref}
      onAccept={(value, mask) => {
        console.log(value);
        handleInputChange(value, onChange);
      }}
      lazy={false}
      normalizeZeros
      overwrite
    />
  );
});
