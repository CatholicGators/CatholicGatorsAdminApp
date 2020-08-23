import React from "react"
import MaskedInput from "react-text-mask"
import { TextMaskCustomProps } from "./customTextMasks"

export function ZipCodeTextMask(props: TextMaskCustomProps) {
    const { inputRef, ...other } = props

    return (
        <MaskedInput
            {...other}
            ref={(ref: any) => {
                inputRef(ref ? ref.inputElement : null)
            }}
            mask={[/\d/, /\d/, /\d/, /\d/, /\d/]}
            placeholderChar={"\u2000"}
            guide={false}
            showMask
        />
    )
}
