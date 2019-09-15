import React, {useRef} from 'react';
import PropTypes from 'prop-types';

const Graph = ({width, height, tableColumnNumber, children}) => {
    const graphRef = useRef();
    const childrenWithProps = React.Children.map(children, child => {
        return React.cloneElement(child, {height, width, tableColumnNumber})
    });

    return (
        <svg
            ref={graphRef}
            viewBox={`0 0 ${width} ${height}`}
            className="mt-6 md:mt-12"
        >
            {childrenWithProps}
        </svg>
    );
};

Graph.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
};

Graph.defaultProps = {
    width: 280,
    height: 60,
};

export default Graph;

