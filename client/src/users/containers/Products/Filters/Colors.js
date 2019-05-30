import React from 'react'

const Colors = ({ colors, choosenColors, filterChange }) => (
    <div className="col-12">
        <p className="dropdown-category-links color">Colors<i className="fas fa-angle-down color"></i></p>
        <div className="category-search-list">
            <ul className="checkbox">
                {colors.map((colors, index) => {
                    const findIndex = choosenColors.findIndex(color => color === colors.color)
                    return <li className="input-group" key={index}>
                        <input type="checkbox" name={colors.color} id={colors.color} value={findIndex !== -1 ? true : false} onChange={e => filterChange(e, "Color")}/>
                        <label htmlFor={colors.color}>{colors.color} ({colors.count})</label>
                    </li>
                })}
            </ul>
        </div>
    </div>
)

export default Colors
