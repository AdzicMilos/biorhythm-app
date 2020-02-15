import React, {useState, useRef} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import moment from 'moment';
import Title from '../../ui-elements/Title';
import Button from '../../ui-elements/Button';
import Input from '../../ui-elements/Input';
import EntryList from './components/EntryList';
import EntryRow from './components/EntryRow';
import Footer from './components/Footer';
import arrowRight from '../../assets/icons/arrow-right.png';
import {useLocalStorage} from '../../util/hooks';
import {
    ENTRIES_PAGE_TITLE,
    SHOW_BUTTON,
    INPUT_NAME_PLACEHOLDER,
    INPUT_NAME_LABEL,
    INPUT_DATE_LABEL,
} from '../constants';

const BiorhythmEntriesView = ({history}) => {
    const [name, setName] = useState('');
    const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
    const uniqueId = () => `id-${Math.random().toString(36).substr(2, 16)}`;
    const [list, setList] = useLocalStorage('list', []);

    const formRef = useRef();

    const handleClick = () => {
        if (!formRef.current.reportValidity()) {
            return;
        }
        const isUnique = list.every(item => item.name !== name || !(moment(date).isSame(item.date)));
        if (isUnique) {
            const id = uniqueId();
            setList([{name, date, id}, ...list.slice(0, 9)]);
            // clear inputs
            setName('');
            setDate(moment().format('YYYY-MM-DD'));
            // history.push({pathname:`graph/${name}_${id}`, state: {name, date, id}});
        }
    }

    return (
        <div className="flex flex-col h-full">
            <Title>
                {ENTRIES_PAGE_TITLE}
            </Title>
            <form 
                ref={formRef} 
                onSubmit={e => e.preventDefault()}
                className="flex flex-col md:flex-row justify-between items-center py-5 w-full"
            >
                <div className="flex w-full flex-col md:flex-row md:w-6/12" >
                    <Input
                        label={INPUT_NAME_LABEL}
                        value={name}
                        className=""
                        handleInputChange={setName}
                        minLength={4}
                        required={true}
                        placeholder={INPUT_NAME_PLACEHOLDER}
                    />
                    <Input
                        type="date"
                        label={INPUT_DATE_LABEL}
                        value={date}
                        className=""
                        handleInputChange={setDate}
                    />
                </div>
                <Button
                    className="flex self-start justify-between mt-4 md:self-end md:mt-0"
                    onClick={handleClick}
                >
                    <span>{SHOW_BUTTON}</span>
                    <img src={arrowRight} alt="show" width="16" height="16" />
                </Button>
            </form>
            <EntryList>
                {list.map((item, index) => (
                    <EntryRow key={index} item={item} />
                ))}
            </EntryList>
            <Footer/>
        </div>
    );
};

BiorhythmEntriesView.propTypes = {
    history: PropTypes.object,
};

BiorhythmEntriesView.defaultProps = {
    history: {},
};

export default withRouter(BiorhythmEntriesView);
