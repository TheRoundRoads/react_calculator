import React from 'react'

const OperationButton = ({ operation, dispatch }) => {
    const handleClick = () => {
        dispatch({ type: "ADD-OPERATION", value: operation})
    };

    return (
        <button onClick={handleClick}>
            {operation}
        </button>
    )
}

export default OperationButton;