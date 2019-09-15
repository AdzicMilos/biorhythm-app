import React from 'react';
import PropTypes from 'prop-types';

const GraphColumnSelected = ({selectedColumn, tableColumnNumber, height, width}) => (
    <rect 
        width="10" 
        height={height} 
        x={(width / tableColumnNumber) * selectedColumn} 
        fill="#ecc94b" 
        fillOpacity="0.4" 
        stroke="#000" 
        strokeWidth="0.2" 
    />
);


GraphColumnSelected.propTypes = {
    selectedColumn: PropTypes.number,
    tableColumnNumber: PropTypes.number,
    height: PropTypes.number,
    width: PropTypes.number,
};

GraphColumnSelected.defaultProps = {
    selectedColumn: 7,
    tableColumnNumber: 28,
    height: null,
    width: null,
};

export default GraphColumnSelected
