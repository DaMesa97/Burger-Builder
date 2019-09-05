import React from 'react'
import classes from './BuildControl.css'

const buildControl = (props) => {
    return (
        <div>
            <div>{props.label}</div>
        </div>
    );
}

export default buildControl