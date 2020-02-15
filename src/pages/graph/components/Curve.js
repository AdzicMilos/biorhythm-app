import React from 'react';
import PropTypes from 'prop-types';

const Curve = props => {
    const {
        curveColor,
        curveWidth,
        points,
    } = props; 

    const smoothing = 0.2;

    const line = (pointA, pointB) => {
      const lengthX = pointB[0] - pointA[0]
      const lengthY = pointB[1] - pointA[1]
      return {
          length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
          angle: Math.atan2(lengthY, lengthX)
        }
    }

    const controlPoint = (current, previous, next, reverse) => {
        const p = previous || current
        const n = next || current
        const o = line(p, n)
        const angle = o.angle + (reverse ? Math.PI : 0)
        const length = o.length * smoothing
        const x = current[0] + Math.cos(angle) * length;
        const y = current[1] + Math.sin(angle) * length;
        return [x, y];
    }

    const svgPath = (points, command) => {
        const d = points.reduce((acc, point, i, a) => i === 0
            ? `M ${point[0]},${point[1]}`
            : `${acc} ${command(point, i, a)}`
        , '')
        return d;
    }

    const bezierCommand = (point, i, a) => {
        const cps = controlPoint(a[i - 1], a[i - 2], point);
        const cpe = controlPoint(point, a[i - 1], a[i + 1], true);
        return `C ${cps[0]},${cps[1]} ${cpe[0]},${cpe[1]} ${point[0]},${point[1]}`
    }

    return (
        <path 
            d={svgPath(points, bezierCommand)} 
            fill="none" 
            stroke={curveColor} 
            strokeWidth={curveWidth} 
        />
    );
};

Curve.propTypes = {
    points: PropTypes.array,
    curveColor: PropTypes.string,
    curveWidth: PropTypes.number,

};

Curve.defaultProps = {
    points: [],
    curveColor: '#000' ,
    curveWidth: 0.2,
    
};

export default Curve;
