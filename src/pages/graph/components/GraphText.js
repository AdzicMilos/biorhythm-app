import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const GraphText = ({tableColumnNumber, tableRowNumber, height, width}) => {
    const weekDays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
    const startDay = moment().subtract(7, 'days');
    const graphDays = Array.from(new Array(tableColumnNumber))
        .map((el, index) => index)
        .map(el => {
            const date = moment(startDay).add(el, 'days');
            const dayOfWeek = weekDays[date.isoWeekday() - 1];
            const dayOfMonth = date.format('D');
            return {
                dayOfWeek,
                dayOfMonth,
                id: el, 
            }
        });
    return (
        <g>
            {graphDays.map(({id, dayOfWeek, dayOfMonth}) => (
                <text key={id} x="2" y="2" fontSize="3" fill={`${dayOfWeek === 'Su' ? '#e53e3e' : 'gray'}`}>
                    <tspan x={((width / tableColumnNumber) * id) + 3} y="4">{dayOfMonth}</tspan>
                    <tspan x={((width / tableColumnNumber) * id) + 3} y={height - 2}>{dayOfWeek}</tspan>
                </text>
            ))}
        </g>

    )
};

GraphText.propTypes = {
    tableColumnNumber: PropTypes.number,
    tableRowNumber: PropTypes.number,
    heigth: PropTypes.number,
    width: PropTypes.number,
};

GraphText.defaltProps = {
    tableRowNumber: 2,
    tableColumnNumber: 28,
    height: null,
    width: null,
};

export default GraphText;
