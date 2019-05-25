import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { searchProducts } from '../../../../store/actions'
import SearchResults from './SearchResults/SearchResults';
import CartItems from './CartItems/CartItems';

import c from '../Navigation.module.css';

const MiddleNavigation = props => {

    useEffect( () => { 
        return () => { 
            props.searchProducts('');
        }
    }, [])

    const [value, setValue] = useState( '' );

    const searchChange = e => { 
        e.preventDefault();
        const value = e.target.value;
        if ( value.length > 0 ) { 
            props.searchProducts( value );
        }
        setValue( value );
    }

    const onSearchFocused = ( e ) => {
        e.preventDefault();
        const ul = e.target.nextElementSibling.nextElementSibling
        ul.classList.add(c.active);
    }

    const onSearchFocusOut = ( e ) => {
        e.preventDefault();        
        const ul = e.target.nextElementSibling.nextElementSibling;
        setTimeout( () => {
            ul.classList.remove( c.active );
            setValue( '' );
            props.searchProducts( '' );
         }, 400)
    }

    const shoppingCartClicked = (e) => {
        e.preventDefault();
        e.target.parentNode.classList.toggle(c.active);
    }

        return(
            <div className={"container " + c.container + " " + c.middle}>
            <div className={c.row + " row"}>
                <div className={c.col12 + " " + c.colLg4 + " col-12 col-lg-4"}>
                    <div className={c.jumbotronePicture}>
                        <Link to="/">
                            <img className="img-fluid" src="https://halcikastore.herokuapp.com/img/halcstore.png" alt="" />
                        </Link>
                    </div>
                </div>
                <div className={c.col12 + " " + c.colLg4 + " col-12 col-lg-4"}>
                    <div className={c.jumbotroneSearch}>
                        <div>
                                <input type="text" id="search-input" className="search-input" autoComplete="off"
                                    placeholder="Search"
                                    onFocus={onSearchFocused}
                                    onBlur={onSearchFocusOut}
                                    onChange={searchChange}
                                    value={value}
                            />
                            <button aria-label="search"><i className="fas fa-search"></i></button>

                            <SearchResults searchResults={props.searchedProducts} loading={props.loading} />
                        </div>
                    </div>
                </div>
                <div className={c.col12 + " " + c.colLg4 + " col-12 col-lg-4"}>
                    <div className={c.jumbotroneLinks}>
                        <div className={c.row + " row"}>
                            <div className="wishlist"><a href="/" aria-label="jfoia" target="_self" rel="noopener"><i className="fas fa-sync"></i></a></div>
                            <div className="span-link">
                                <i className="fas fa-shopping-cart"
                                onClick={shoppingCartClicked}></i>
                                <span>{0}</span>
                                <CartItems items={[]}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
}

const mapStateToProps = state => { 
    return {
        searchedProducts: state.product.searchedProducts,
        loading: state.product.loading
    }
}

const dispatchMapToProps = dispatch => { 
    return {
        searchProducts: (query) => dispatch(searchProducts(query))
    }
}

export default connect(mapStateToProps, dispatchMapToProps)(MiddleNavigation);