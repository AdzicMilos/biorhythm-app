import React from 'react';
import PropTypes from 'prop-types';

const Title = ({children, className}) => {
    return (
        <div className={`border-b-2 border-black-600 ${className || 'text-xl md:text-4xl font-bold py-2'}`}>{children}</div>
    );
}

Title.propTypes = {
    className: PropTypes.string,
};

Title.defaultProps = {
    className: null,
}

export default Title;

