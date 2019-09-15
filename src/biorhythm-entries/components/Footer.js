import React from 'react';

const Footer = props => (
    <div className="flex-shrink-0">
        <div className="mt-10 w-64 border-t-2 border-solid border-black-600 h-2" />
        <div className="py-2">
            A biorhythm (from Greek βίος - bios, "life"[1] and ῥυθμός - rhuthmos, "any regular recurring motion, rhythm"[2]) 
            is an attempt to predict various aspects of a person's life through simple mathematical cycles. The theory was 
            developed by Wilhelm Fliess in the late 19th century, and was popularized in the United States in late 1970s. 
            Most scientists believe that the idea has no more predictive power than chance.
        </div>
        <a 
            className="font-bold" 
            href="https://en.wikipedia.org/wiki/Biorhythm" 
            rel="noopener noreferrer"
            target="_blank" 
        >
            https://en.wikipedia.org/wiki/Biorhythm
        </a>
    </div>
);

export default Footer;
