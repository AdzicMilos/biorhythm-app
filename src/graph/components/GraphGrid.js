import React from 'react';
import PropTypes from 'prop-types';

const GraphGrid = ({tableRowNumber, tableColumnNumber, height, width}) => {
    const horizontalLines = Array.from(new Array(tableRowNumber + 1)
        .map((el, index) => index))
        .map((el, i, arr) => {
            const rowHeight = height / tableRowNumber; 
            return {
                x1: 0,
                y1: i * rowHeight,
                x2: width,
                y2: i * rowHeight,
            }
        });
    const verticalLines = Array.from(new Array(tableColumnNumber + 1)
        .map((el, index) => index))
        .map((el, i) => {
            const spaceBetweenLines = width / tableColumnNumber; 
            return {
                x1: i * spaceBetweenLines,
                y1: 0,
                x2: i * spaceBetweenLines,
                y2: height,
            }
        });
    return (
        <g stroke="gray" >
            {horizontalLines.map(({x1, y1, x2, y2}, i) => (
                <line 
                    key={i} 
                    x1={x1} 
                    y1={y1} 
                    x2={x2} 
                    y2={y2} 
                    strokeWidth="0.1" 
                /> 
            ))}
            {verticalLines.map(({x1, y1, x2, y2}, i) => (
                <line 
                    key={i} 
                    x1={x1} 
                    y1={y1} 
                    x2={x2} 
                    y2={y2} 
                    strokeWidth="0.1" 
                /> 
            ))}
        </g>
    );
};

GraphGrid.propTypes = {
    tableColumnNumber: PropTypes.number,
    tableRowNumber: PropTypes.number,
    heigth: PropTypes.number,
    width: PropTypes.number,
};

GraphGrid.defaltProps = {
    tableRowNumber: 2,
    tableColumnNumber: 28,
    height: null,
    width: null,
};

export default GraphGrid;

