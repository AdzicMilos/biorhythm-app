import React from 'react';
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

const cookies = new Cookies();

const GraphView = props => {
    const tableColumnNumber = 28;
    const tableRowNumber = 2;
    const weekDays = ['Monday', 'Tuesday', 'Wendseday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const curveTopPosition = 55;
    const curveBottomPosition = 5;
    const curveMiddlePosition = (curveTopPosition + curveBottomPosition) / 2;
    const users = cookies.get('list');
    const user = users.find(user => `${user.name}_${user.id}` === props.match.params.detailsId);
    const {name, date} = user || {};
    const physical = {
        color: '#e53e3e', 
        duration: 23 * 10,
        name: 'Physical',
    };
    const emotional = {
        color: '#48bb78', 
        duration: 28 * 10,
        name: 'Emotional',
    };
    const intuitive = {
        color: '#ecc94b', 
        duration: 38 * 10,
        name: 'Intuitive',
    };
    const intellectual = {
        color: '#63b3ed', 
        duration: 33 * 10,
        name: 'Intellectual',
    };

    const currentDay = moment().startOf('day');
    const dateBirth = moment(date, 'YYYY-MM-DD');
    const dayOfBirth = weekDays[dateBirth.isoWeekday() - 1];
    const dayOfLife = currentDay.diff(dateBirth, 'days');

    const svgWidth = ((dayOfLife + tableColumnNumber - 8) / tableColumnNumber) * 280;  
    const getTotalCycleNumber = (totalDays, amplitude) => {
        return totalDays / amplitude;
    };

    const getPoints = (startPosition, amplitude, isOdd) => {
        let result = [];
        let currentPosition = startPosition;
        let isOddType = isOdd; 
        while (currentPosition <= (tableColumnNumber * 10 + 280)) {
            let height = isOddType ? curveTopPosition : curveBottomPosition;
            if (result.length === 0 && startPosition >= 0) {
                height = curveMiddlePosition;
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
                const unRenderedCycles = Math.floor(cycleNumber) - Math.ceil((visibleSvgWidth / duration)) * 2;
                const startPositionOfUnrederedCycles = -(fullSvgWidth - visibleSvgWidth);
                return startPositionOfUnrederedCycles + (((unRenderedCycles - 1) * duration) + (duration / 4));
            }
            return -(fullSvgWidth - visibleSvgWidth);
        } 
        return visibleSvgWidth - fullSvgWidth;
    };

    const getInitialValueOdHeight = (fullSvgWidth, visibleSvgWidth, cycleNumber, duration) => {
        if (fullSvgWidth > visibleSvgWidth && ((fullSvgWidth - visibleSvgWidth) > duration)) {
            const unRenderedCycles = Math.floor(cycleNumber) - Math.ceil((visibleSvgWidth / duration)) * 2;
            return unRenderedCycles % 2 === 0;
        } 
        return true;
    };

    const emotionalPoints = getPoints(
        getStartPosition(
            svgWidth, 
            tableColumnNumber * 10, 
            getTotalCycleNumber(dayOfLife + tableColumnNumber - 8, 28),
            emotional.duration,
        ),
        emotional.duration / 2, 
        getInitialValueOdHeight(
            svgWidth, 
            tableColumnNumber * 10, 
            getTotalCycleNumber(dayOfLife + tableColumnNumber - 8, 28),
            emotional.duration,
        ),
    );

    const physicalPoints = getPoints(
        getStartPosition(
            svgWidth, 
            tableColumnNumber * 10, 
            getTotalCycleNumber(dayOfLife + tableColumnNumber - 8, 23),
            physical.duration,
        ),
        physical.duration / 2, 
        getInitialValueOdHeight(
            svgWidth, 
            tableColumnNumber * 10, 
            getTotalCycleNumber(dayOfLife + tableColumnNumber - 8, 23),
            physical.duration,
        ),
    );

    const intellectualPoints = getPoints(
        getStartPosition(
            svgWidth, 
            tableColumnNumber * 10, 
            getTotalCycleNumber(dayOfLife + tableColumnNumber - 8, 33),
            intellectual.duration,
        ),
        intellectual.duration / 2, 
        getInitialValueOdHeight(
            svgWidth, 
            tableColumnNumber * 10, 
            getTotalCycleNumber(dayOfLife + tableColumnNumber - 8, 33),
            intellectual.duration,
        ),
    );

    const intuitivePoints = getPoints(
        getStartPosition(
            svgWidth, 
            tableColumnNumber * 10, 
            getTotalCycleNumber(dayOfLife + tableColumnNumber - 8, 38),
            intuitive.duration,
        ),
        intuitive.duration / 2, 
        getInitialValueOdHeight(
            svgWidth, 
            tableColumnNumber * 10, 
            getTotalCycleNumber(dayOfLife + tableColumnNumber - 8, 38),
            intuitive.duration,
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
                <Graph tableColumnNumber={tableColumnNumber}>
                    <GraphGrid 
                        tableRowNumber={tableRowNumber}
                    />
                    <GraphText
                        tableRowNumber={tableRowNumber}
                    />
                    <GraphColumnSelected />
                    <Curve
                        curveColor={physical.color}
                        points={physicalPoints}
                    />
                    <Curve
                        curveColor={emotional.color}  
                        points={emotionalPoints}
                    />
                    <Curve
                        curveColor={intellectual.color} 
                        points={intellectualPoints}
                    />
                    <Curve
                        curveColor={intuitive.color}  
                        points={intuitivePoints}
                    />
                </Graph>
                <GraphLegend 
                    legends={[physical, emotional, intellectual, intuitive]}
                />
                {/*
                <svg viewBox="0 0 560 14">
                    <rect x="400" width="8" height="8" fill="red" y="6" />
                    <text x="410" y="13" fontSize="6" fill="gray">Physical</text>
                    <rect x="440" width="8" height="8" fill="green" y="6" />
                    <text x="450" y="13" fontSize="6" fill="gray">Intelectual</text>
                    <rect x="485" width="8" height="8" fill="yellow" y="6" />
                    <text x="495" y="13" fontSize="6" fill="gray">Intuitive</text>
                    <rect x="522" width="8" height="8" fill="blue" y="6" />
                    <text x="532" y="13" fontSize="6" fill="gray">Emotional</text>
                </svg>
                */}
            </div>
            <BiorhythmResult 
                dayOfLife={dayOfLife}
                biorhythmCircles={[physical, emotional, intellectual, intuitive]} 
            />
            <div className="flex flex-col text-xl my-4 px-2">
                <p>Day of birth: <span className="font-bold">{dayOfBirth}</span></p>
                <p>Day of life: <span className="font-bold">{dayOfLife}</span></p>
            </div>
        </div>
    );
};

export default GraphView;
