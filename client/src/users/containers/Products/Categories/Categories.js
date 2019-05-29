import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import Subcategories from './Subcategories';

const Categories = ({ categories }) => {

    const [show, setShow] = useState(true); 
    const categorySearchList = useRef();
    const [categorySearchListHeight, setCategorySearchListHeight] = useState('');
    
    useEffect(() => {
        setTimeout(() => {
            setCategorySearchListHeight(categorySearchList.current.clientHeight)
        }, 2000);
    }, []);

    const clicked = e => {
        e.preventDefault();
        setShow(!show)
    }

    return (
        <div className="col-12">
            <p className={show ? "dropdown-category-links color" : 'dropdown-category-links down'} onClick={clicked}>Categories<i className={show ? "fas fa-angle-down color" : 'fas fa-angle-down'}></i></p>
            <div className="category-search-list" ref={categorySearchList} 
            style={show ? 
            { height: categorySearchListHeight+'px', transition: 'height .3s ease-in' } : 
            { height: '0px', transition: 'height .3s ease-in' }}>
                <Subcategories categories={categories} />
            </div>
        </div>
    )

}

const mapStateToProps = state => ({
    
})

const mapDispatchToProps = dispatch => ({
    
})

export default connect(mapStateToProps, mapDispatchToProps)(Categories)
