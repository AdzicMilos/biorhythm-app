import React from 'react';
import PropTypes from 'prop-types';
import {SHOW_BUTTON} from '../pages/constants';

const Button = ({children, onClick, className, isDisabled}) => {
    return (
        <button
            className={`
                bg-yellow-500
                justify-between
                items-center
                hover:bg-yellow-600
                text-black
                px-3
                py-1
                w-20
                rounded
                ${className ? className : ''}
            `}
            onClick={onClick}
            disabled={isDisabled}
        >
            {children || SHOW_BUTTON}
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
