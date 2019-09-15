import React from 'react';
import PropTypes from 'prop-types';

const GraphLegend = ({legends}) => (
    <div 
        className="flex flex-row justify-between items-center py-3 self-end" 
        style={{minWidth: '300px'}}
    >
        {legends.map(({name, color}, index, arr) => (
            <div key={name} className={`flex flex-row ${index === arr.length - 1 ? '' : 'pr-2 md:pr-3'}`}>
                <div className="w-3 h-3 md:w-4 md:h-4 mr-1" style={{backgroundColor: color}} />
                <p className="md:self-end text-xs md:text-sm">{name}</p>
            </div>

        ))}
    </div>
);

GraphLegend.propTypes = {
    legends: PropTypes.array,
};

GraphLegend.defaultProps = {
    legends: [],
};

export default GraphLegend;
