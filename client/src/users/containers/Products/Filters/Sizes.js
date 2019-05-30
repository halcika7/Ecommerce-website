import React from 'react'

const Sizes = ({ sizes, choosenLabeledBy, filterChange }) => (
    <div className="col-12">
        <p className="dropdown-category-links color">Sizes<i className="fas fa-angle-down color"></i></p>
        <div className="category-search-list">
            <ul className="checkbox">
                {sizes.map((size, index) =>{
                    const findIndex = choosenLabeledBy.findIndex(siz => siz === size.size)
                    return <li className="input-group" key={index}>
                        <input type="checkbox" name={size.size} id={size.size} value={findIndex !== -1 ? true : false} onChange={e => filterChange(e, 'Size')} />
                        <label htmlFor={size.size}>{size.size} ({size.count})</label>
                    </li>
                })}
            </ul>
        </div>
    </div>
)

export default Sizes
