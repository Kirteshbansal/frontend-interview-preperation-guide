import React from 'react'

function Text({ variant = 'p', text, classes }) {
    if(!text) throw Error('Text prop is empty')
    switch (variant) {
        case 'h1':
            return <h1 className={classes}>{text}</h1>;
        case 'p':
            return <p className={classes}>{text}</p>;
        default:
            return <p className={classes}>{text}</p>;
    }
}

export default Text