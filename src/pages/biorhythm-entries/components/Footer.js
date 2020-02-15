import React from 'react';
import {FOOTER_TITLE, FOOTER_LINK} from '../../constants';

const Footer = props => (
    <div className="flex-shrink-0">
        <div className="mt-10 w-64 border-t-2 border-solid border-black-600 h-2" />
        <div className="py-2">{FOOTER_TITLE}</div>
        <a 
            className="font-bold" 
            href="https://en.wikipedia.org/wiki/Biorhythm" 
            rel="noopener noreferrer"
            target="_blank" 
        >
            {FOOTER_LINK}
        </a>
    </div>
);

export default Footer;
