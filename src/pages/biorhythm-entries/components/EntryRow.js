import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import moment from 'moment';
import Button from '../../../ui-elements/Button';
import arrowRight from '../../../assets/icons/arrow-right.png';
import {SHOW_BUTTON} from '../../constants';

const EntryRow = ({item, history}) => (
    <div className="flex flex-row w-full justify-between items-center py-2 border-b-2">
        <div className="flex flex-row">
            <div className="font-bold w-20 mr-2 md:w-32 md:mr-5">{item.name}</div>
            <div>{moment(item.date).format('DD.MM.YYYY')}</div>
        </div>
        <Button 
            className="flex self-end"
            onClick={() => history.push(`/graph/${item.name}_${item.id}`)}
        >
            <span>{SHOW_BUTTON}</span>
            <img src={arrowRight} alt="show" width="16" height="16" />
        </Button>
    </div>
);

EntryRow.propTypes = {
    item: PropTypes.object,
    history: PropTypes.object,
};

EntryRow.defaultProps = {
    item: null,
    history: null,
}

export default withRouter(EntryRow);
