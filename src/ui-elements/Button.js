import React from 'react';
import PropTypes from 'prop-types';

const Button = ({children, onClick, className, isDisabled}) => {
    return (
        <button
            className={`bg-yellow-500 justify-between items-center hover:bg-yellow-600 text-black px-2 w-20 rounded-lg ${className ? className : ''}`}
            onClick={onClick}
            disabled={isDisabled}
        >
            {children || 'Show'}
        </button>
    );
};

Button.propTypes = {
    onClick: PropTypes.func,
    className: PropTypes.string,
    isDisabled: PropTypes.bool,
};

Button.defaultProps = {
    onClick: null,
    className: null,
    isDisabled: false,
};

export default Button;
