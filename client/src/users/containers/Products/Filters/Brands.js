import React from 'react'

const Brands = ({ brands, choosenBrands, filterChange }) => (
    <div className="col-12">
        <p className="dropdown-category-links color">Brands<i className="fas fa-angle-down color"></i></p>
        <div className="category-search-list">
            <ul className="checkbox">
                {brands.map((brand, index) => {
                    const findIndex = choosenBrands.findIndex(brand => brand === brand._id)
                    return <li className="input-group" key={index}>
                        <input type="checkbox" name={brand._id} id={brand._id} value={findIndex !== -1 ? true : false} onChange={e => filterChange(e, "Brand")}/>
                        <label htmlFor={brand._id}>{brand._id} ({brand.count})</label>
                    </li>
                })}
            </ul>
        </div>
    </div>
)

export default Brands
