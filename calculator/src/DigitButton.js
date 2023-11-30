import React from 'react'

const DigitButton = ({ digit, dispatch }) => {
    const handleClick = () => {
        dispatch({ type: "ADD-DIGIT", value: digit})
    };

    return (
        <button onClick={handleClick}>
            {digit}
        </button>
    )
}

export default DigitButton;