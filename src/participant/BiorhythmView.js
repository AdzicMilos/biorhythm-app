import React, {useState, useEffect, useRef} from 'react';
import moment from 'moment';
import Cookies from 'universal-cookie';
import Title from '../ui-elements/Title';
import Button from '../ui-elements/Button';
import Input from '../ui-elements/Input';
import ParticipantList from './components/ParticipantList';
import ParticipantRow from './components/ParticipantRow';
import Footer from './components/Footer';
import arrowRight from '../assets/icons/arrow-right.png';

const cookies = new Cookies();

const BiorhythmView = props => {
    const [name, setName] = useState('');
    const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
    const [list, setList] = useState([]);
    const uniqueId = () => `id-${Math.random().toString(36).substr(2, 16)}`;

    useEffect(() => {
        const cookie = cookies.get('list');
        if (cookie) {
           setList(cookie);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const cookie = JSON.stringify(list);
        cookies.set('list', cookie);
        console.log(list)
    }, [list])

    const formRef = useRef();

    const handleClick = () => {
        if (!formRef.current.reportValidity()) {
            return;
        }
        const isUnique = list.every(item => item.name !== name || !(moment(date).isSame(item.date)));
        if (isUnique) {
            setList([{name, date, id: uniqueId()}, ...list.slice(0, 9)]);
            // clear inputs
            setName('');
            setDate(moment().format('YYYY-MM-DD'));
        }
    }

    return (
        <div>
            <Title>
                Biorhythm
            </Title>
            <form 
                ref={formRef} 
                onSubmit={e => e.preventDefault()}
                className="flex flex-col md:flex-row justify-between items-center py-5 w-full"
            >
                <div className="flex w-full flex-col md:flex-row md:w-6/12" >
                    <Input
                        label="Name"
                        value={name}
                        className=""
                        handleInputChange={setName}
                        minLength={4}
                        required={true}
                        placeholder='Add name'
                    />
                    <Input
                        type="date"
                        label="Birthday"
                        value={date}
                        className=""
                        handleInputChange={setDate}
                    />
                </div>
                <Button
                    className="flex self-start justify-between mt-4 md:self-end md:mt-0"
                    onClick={handleClick}
                >
                    <span>Show</span>
                    <img src={arrowRight} alt="show" width="16" height="16" />
                </Button>
            </form>
            <ParticipantList>
                {list.map((item, index) => (
                    <ParticipantRow key={index} item={item} />
                ))}
            </ParticipantList>
            <Footer/>
        </div>
    );
};

export default BiorhythmView;
