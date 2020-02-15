import React from 'react';
import Title from '../../../ui-elements/Title';
import {ENTRY_LIST_TITLE} from '../../constants';

const EntryList = ({children}) => {
    return (
        <div className="my-8" style={{flex: '1 0 auto'}}>
            <Title className="text-2xl py-3">{ENTRY_LIST_TITLE}</Title>
            {children}
        </div>
    );
};

export default EntryList;

