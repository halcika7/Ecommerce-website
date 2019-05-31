import React, { useState } from 'react'
import classes from './Filters.module.css';

const Filters = ({ values, choosenValues, setChoosenValues, filterChange, property, label }) => {

    const [show, setShow] = useState(true); 

    const clicked = e => {
        e.preventDefault();
        setShow(!show)
    }
    
    return (
        <div className="col-12">
            <p className={show ? "dropdown-category-links color" : 'dropdown-category-links down'} onClick={clicked}>{label}<i className={show ? "fas fa-angle-down color" : 'fas fa-angle-down'}></i></p>
            {show && <div className="category-search-list">
                <ul className={classes.checkbox + " checkbox"}>
                    {values.map((values, index) => {
                        const findIndex = choosenValues.findIndex(val => val === values[property])
                        const bool = (label === 'Bluetooth' || label === 'Wifi') ? true : false;
                        return <li className={classes.inputGroup + " input-group"} key={index}>
                            <input 
                                type="checkbox" 
                                name={(label === 'Bluetooth' || label === 'Wifi') ? values[property].toString() : values[property]} 
                                id={values[property]+label} 
                                checked={(findIndex !== -1) ? true : false} 
                                onChange={e => filterChange(e, choosenValues, setChoosenValues, bool)}/>
                            <label htmlFor={values[property]+label}>
                                {(label === 'Bluetooth' || label === 'Wifi') ? values[property].toString() : values[property]} 
                                {(property === 'graphic' || property === 'memory' || property === 'ssd' || property === 'hdd' || property === 'ram') ? ' GB ' : (property === 'display') ? " '' " : ' '}
                                ({values.count})
                            </label>
                        </li>
                    })}
                </ul>
            </div>}
        </div>
    )
}

export default Filters
