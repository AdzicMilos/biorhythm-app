import React from 'react';
import PropTypes from 'prop-types';

const BiorhythmResult = ({dayOfLife, biorhythmCircles}) => {
    const getCurvePosition = (lifeDuration, biorhythmDuration) => {
        const yPosition = Math.sin((2 * Math.PI * lifeDuration) / biorhythmDuration)
        const result = yPosition * 100; 
        return Math.round(result);
    };
    return (
        <div className="w-full my-4">
            <div className="text-xl font-bold px-2 pb-2">Today</div>
            <div className="flex flex-col w-full bg-gray-200 p-2">
                {biorhythmCircles.map(({name, color, duration}, index, arr) => (
                    <div className={`flex flex-row ${index < arr.length - 1 ? 'mb-2' : ''}`} key={name}>
                        <div className="w-6 h-6 mr-2" style={{backgroundColor: color}} />
                        <p className="self-end mt-1">{name} = {getCurvePosition(dayOfLife, duration / 10)}%</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

BiorhythmResult.propTypes = {
    currentDay: PropTypes.number,
    dayOfLife: PropTypes.number,
};

BiorhythmResult.defaultProps = {
    currentDay: null,
    dayOfLife: null,
};

export default BiorhythmResult;
