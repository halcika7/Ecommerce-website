import React from 'react';

import c from './page.module.css';

import image from '../../assets/images/error.png';

const PageNotFound = props => {
    return (
        <React.Fragment>
            <section className={c.flatError}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className={c.wrapErrorCenter}>
                                <div className="header-error">
                                    <img src={image} alt="404 Page" />
                                    <h1>Sorry but we couldn’t find the page you are looking for.</h1>
                                    <p>Please check to make sure you’ve typed the URL correctly. Maybe try a search?</p>
                                </div>
                                <div className="content-error">
                                    <div className={c.formSearchError}>
                                        <form>
                                            <div className="search-input">
                                                <input type="text" name="search" placeholder="Search" />
                                                <button type="submit">Search</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
}

export default PageNotFound;