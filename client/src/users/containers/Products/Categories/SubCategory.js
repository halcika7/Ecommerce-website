import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const SubCategory = ({ category, subcategory }) => {

    const [show, setShow] = useState(false);

    return (
        <div className="category-search-list color sub" >
            <ul className="cat-child">
                <li>
                    <span className="dropdown-category-links color" onClick={e => setShow(!show)}><i className="fas fa-angle-down color"></i>{subcategory.name} ({subcategory.subcategories.length})</span>
                    <div className="category-search-list sub">
                        <ul className="cat-child">
                            {show && subcategory.subcategories.map((sub, index) => 
                                <li key={index}>
                                    <Link to={`/products?category=${category}&subcategoryName=${subcategory.name}&subcategory=${sub}`}>{sub}</Link>
                                    </li>
                            )}
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    )

}

const mapStateToProps = state => ({
    
})

const mapDispatchToProps = dispatch => ({
    
})

export default connect(mapStateToProps, mapDispatchToProps)(SubCategory)
