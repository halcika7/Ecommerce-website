import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import SearchResults from './SearchResults/SearchResults';
import CartItems from './CartItems/CartItems';

import c from '../Navigation.module.css';

class MiddleNavigation extends Component {
    state = {
        searchResults: [
            {src: 'https://halcikastore.herokuapp.com/img/8.png', alt: '', href: '/', title: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi, fugiat.', old: '1$', new: '1234'},
            {src: 'https://halcikastore.herokuapp.com/img/8.png', alt: '', href: '/', title: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi, fugiat.', old: '12$', new: '1234'},
            {src: 'https://halcikastore.herokuapp.com/img/8.png', alt: '', href: '/', title: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi, fugiat.', old: '12u$', new: '1234'},
            {src: 'https://halcikastore.herokuapp.com/img/8.png', alt: '', href: '/', title: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi, fugiat.', old: '12u9$', new: '1234'},
            {src: 'https://halcikastore.herokuapp.com/img/8.png', alt: '', href: '/', title: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi, fugiat.', old: '12u90$', new: '1234'},
            {src: 'https://halcikastore.herokuapp.com/img/8.png', alt: '', href: '/', title: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi, fugiat.', old: '12u904$', new: '1234'},
            {src: 'https://halcikastore.herokuapp.com/img/8.png', alt: '', href: '/', title: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi, fugiat.', old: '12u9043$', new: '1234'},
            {src: 'https://halcikastore.herokuapp.com/img/8.png', alt: '', href: '/', title: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi, fugiat.', old: '', new: '1234'},
            {src: 'https://halcikastore.herokuapp.com/img/8.png', alt: '', href: '/', title: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi, fugiat.', old: '43$', new: '1234'}
        ],
        cartItems: [
            {src: 'https://halcikastore.herokuapp.com/img/8.png', alt: '', href: '/', title: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi, fugiat.', qty: 1, new: 45},
            {src: 'https://halcikastore.herokuapp.com/img/8.png', alt: '', href: '/', title: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi, fugiat.', qty: 3, new: 120}
        ],
    }

    onSearchFocused = (event) => {
        const ul = event.target.nextElementSibling.nextElementSibling
        ul.classList.add(c.active);
    }

    onSearchFocusOut = (event) => {
        const ul = event.target.nextElementSibling.nextElementSibling
        ul.classList.remove(c.active);
    }

    shoppingCartClicked = (event) => {
        event.preventDefault();
        event.target.parentNode.classList.toggle(c.active);
    }

    render () {
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
                            <input type="text" id="search-input" className="search-input" 
                            placeholder="Search" 
                            onFocus={this.onSearchFocused}
                            onBlur={this.onSearchFocusOut}/>

                            <button aria-label="search"><i className="fas fa-search"></i></button>

                            <SearchResults searchResults={this.state.searchResults} />
                        </div>
                    </div>
                </div>
                <div className={c.col12 + " " + c.colLg4 + " col-12 col-lg-4"}>
                    <div className={c.jumbotroneLinks}>
                        <div className={c.row + " row"}>
                            <div className="wishlist"><a href="/" aria-label="jfoia" target="_self" rel="noopener"><i className="fas fa-sync"></i></a></div>
                            <div className="span-link">
                                <i className="fas fa-shopping-cart"
                                onClick={this.shoppingCartClicked}></i>
                                <span>{this.state.cartItems.length}</span>
                                <CartItems items={this.state.cartItems}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

export default MiddleNavigation;