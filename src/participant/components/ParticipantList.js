import React from 'react';
import Title from '../../ui-elements/Title';

const PartcipantList = props => {
    return (
        <div className="my-8">
            <Title className="text-2xl py-3">Last 10 Entries</Title>
            {props.children}
        </div>
    );
};

export default PartcipantList;

