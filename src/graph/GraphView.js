import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import moment from 'moment';
import Cookies from 'universal-cookie';
import Title from '../ui-elements/Title';
import Graph from './components/Graph';
import GraphGrid from './components/GraphGrid';
import GraphText from './components/GraphText';
import GraphColumnSelected from './components/GraphColumnSelected';
import Curve from './components/Curve';
import GraphLegend from './components/GraphLegend';
import BiorhythmResult from './components/BiorhythmResult';
import arrowLeft from '../assets/icons/arrow-left.png';
import {
    TABLE_COLUMN_NUMBER,
    TABLE_ROW_NUMBER,
    CURVE_TOP_POSITION,
    CURVE_BOTTOM_POSITION,
    CURVE_MIDDLE_POSITION,
    PHYSICAL, 
    EMOTIONAL, 
    INTELLECTUAL, 
    INTUITIVE,
    getTotalCycleNumber,
} from './components/cycleConstants';

const cookies = new Cookies();

const GraphView = ({match, location}) => {
    const users = cookies.get('list') || [];
    const {params = {}} = match;
    const user = users.find(({name, id}) => `${name}_${id}` === params.graphId) || location.state;
    const {name, date} = user || {};
    const weekDays = ['Monday', 'Tuesday', 'Wendseday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const currentDay = moment().startOf('day');
    const dateBirth = moment(date, 'YYYY-MM-DD');
    const dayOfBirth = weekDays[dateBirth.isoWeekday() - 1];
    const dayOfLife = currentDay.diff(dateBirth, 'days');
    const svgWidth = (dayOfLife + TABLE_COLUMN_NUMBER - 8) * 10;  
    const getPoints = (startPosition, amplitude, isOdd) => {
        let result = [];
        let currentPosition = startPosition;
        let isOddType = isOdd; 
        while (currentPosition <= (TABLE_COLUMN_NUMBER * 10 + 280)) {
            let height = isOddType ? CURVE_TOP_POSITION : CURVE_BOTTOM_POSITION;
            if (result.length === 0 && startPosition >= 0) {
                height = CURVE_MIDDLE_POSITION;
            } 
            result.push([currentPosition, height]);
            currentPosition = currentPosition + amplitude;
            isOddType = !isOddType; 
        }
        return result;
    }; 

    const getStartPosition = (fullSvgWidth, visibleSvgWidth, cycleNumber, duration) => {
        if (fullSvgWidth > visibleSvgWidth) {
            if ((fullSvgWidth - visibleSvgWidth) > duration) {
                const unRenderedCycles = Math.floor(cycleNumber) - (Math.ceil(visibleSvgWidth / duration) * 2);
                const startPositionOfUnrederedCycles = -(fullSvgWidth - visibleSvgWidth);
                return startPositionOfUnrederedCycles + (((unRenderedCycles - 1) * duration) + (duration * 3 / 4));
            }
            return -(fullSvgWidth - visibleSvgWidth);
        } 
        return visibleSvgWidth - fullSvgWidth;
    };

    const getInitialValueOdHeight = (fullSvgWidth, visibleSvgWidth, cycleNumber, duration) => {
        if (fullSvgWidth > visibleSvgWidth && ((fullSvgWidth - visibleSvgWidth) > duration)) {
            const unRenderedCycles = Math.floor(cycleNumber) - (Math.ceil(visibleSvgWidth / duration) * 2);
            return (unRenderedCycles * 2) % 2 === 0;
        } 
        return true;
    };

    const emotionalPoints = getPoints(
        getStartPosition(
            svgWidth, 
            TABLE_COLUMN_NUMBER * 10, 
            getTotalCycleNumber(dayOfLife + TABLE_COLUMN_NUMBER - 8, 28),
            EMOTIONAL.duration,
        ),
        EMOTIONAL.duration / 2, 
        getInitialValueOdHeight(
            svgWidth, 
            TABLE_COLUMN_NUMBER * 10, 
            getTotalCycleNumber(dayOfLife + TABLE_COLUMN_NUMBER - 8, 28),
            EMOTIONAL.duration,
        ),
    );

    const physicalPoints = getPoints(
        getStartPosition(
            svgWidth, 
            TABLE_COLUMN_NUMBER * 10, 
            getTotalCycleNumber(dayOfLife + TABLE_COLUMN_NUMBER - 8, 23),
            PHYSICAL.duration,
        ),
        PHYSICAL.duration / 2, 
        getInitialValueOdHeight(
            svgWidth, 
            TABLE_COLUMN_NUMBER * 10, 
            getTotalCycleNumber(dayOfLife + TABLE_COLUMN_NUMBER - 8, 23),
            PHYSICAL.duration,
        ),
    );

    const intellectualPoints = getPoints(
        getStartPosition(
            svgWidth, 
            TABLE_COLUMN_NUMBER * 10, 
            getTotalCycleNumber(dayOfLife + TABLE_COLUMN_NUMBER - 8, 33),
            INTELLECTUAL.duration,
        ),
        INTELLECTUAL.duration / 2, 
        getInitialValueOdHeight(
            svgWidth, 
            TABLE_COLUMN_NUMBER * 10, 
            getTotalCycleNumber(dayOfLife + TABLE_COLUMN_NUMBER - 8, 33),
            INTELLECTUAL.duration,
        ),
    );

    const intuitivePoints = getPoints(
        getStartPosition(
            svgWidth, 
            TABLE_COLUMN_NUMBER * 10, 
            getTotalCycleNumber(dayOfLife + TABLE_COLUMN_NUMBER - 8, 38),
            INTUITIVE.duration,
        ),
        INTUITIVE.duration / 2, 
        getInitialValueOdHeight(
            svgWidth, 
            TABLE_COLUMN_NUMBER * 10, 
            getTotalCycleNumber(dayOfLife + TABLE_COLUMN_NUMBER - 8, 38),
            INTUITIVE.duration,
        ),
    );

    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-col w-full">
                <Title>
                    <div className="flex flex-col">
                        <div className="flex justify-between w-full text-base md:text-xl font-normal">
                            <Link to='/' className="flex flex-row justifyx-between items-center">
                                <img src={arrowLeft} alt="back" width="16" height="16" />
                                <span>Back</span>
                            </Link>
                            <span>{moment(date).format('DD.MM.YYYY')}</span>
                        </div>
                        <div className="flex justify-between w-full">
                            <span>Biorhythm graph</span>
                            <span>{name}</span>
                        </div>
                    </div>
                </Title>
                <Graph 
                    tableColumnNumber={TABLE_COLUMN_NUMBER}
                    tableRowNumber={TABLE_ROW_NUMBER}
                >
                    <GraphGrid />
                    <GraphText />
                    <GraphColumnSelected />
                    <Curve
                        curveColor={PHYSICAL.color}
                        points={physicalPoints}
                    />
                    <Curve
                        curveColor={EMOTIONAL.color}  
                        points={emotionalPoints}
                    />
                    <Curve
                        curveColor={INTELLECTUAL.color} 
                        points={intellectualPoints}
                    />
                    <Curve
                        curveColor={INTUITIVE.color}  
                        points={intuitivePoints}
                    />
                </Graph>
                <GraphLegend 
                    legends={[PHYSICAL, EMOTIONAL, INTELLECTUAL, INTUITIVE]}
                />
            </div>
            <BiorhythmResult 
                dayOfLife={dayOfLife}
                biorhythmCircles={[PHYSICAL, EMOTIONAL, INTELLECTUAL, INTUITIVE]} 
            />
            <div className="flex flex-col text-xl my-4 px-2">
                <p>Day of birth: <span className="font-bold">{dayOfBirth}</span></p>
                <p>Day of life: <span className="font-bold">{dayOfLife}</span></p>
            </div>
        </div>
    );
};

GraphView.propTypes = {
    match: PropTypes.object,
};

GraphView.defaultProps = {
    match: {},
};

export default GraphView;
