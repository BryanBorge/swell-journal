import React, { FC } from "react";
import { IMaskInput } from "react-imask";

export const SwellMaskedInput: FC<any> = React.forwardRef(({ onChange, ...other }, ref) => {
  const mask = `0.0ft @ 00s {cardDir}(000)`;

  return (
    <IMaskInput
      {...other}
      mask={mask}
      blocks={{
        feet: {
          mask: "#.#",
          scale: 1,
          radix: ".",
          thousandsSeparator: "",
          mapToRadix: ["."],
          normalizeZeros: true,
          min: 0,
          max: 100,
          padFractionalZeros: true,
        },
        direction: {
          mask: "#",
          scale: 0,
          min: 1,
          max: 60,
        },
        cardDir: {
          mask: /^(N|NNE|NE|ENE|E|ESE|SE|SSE|S|SSW|SW|WSW|W|WNW|NW|NNW)$/i,
          transform: (value: string) => value.toUpperCase(), // Ensure that input is converted to uppercase
        },
        numDir: {
          mask: "###",
          scale: 0,
          min: 0,
          max: 360,
        },
      }}
      inputRef={ref}
      onAccept={value => onChange(value)}
      overwrite
    />
  );
});
