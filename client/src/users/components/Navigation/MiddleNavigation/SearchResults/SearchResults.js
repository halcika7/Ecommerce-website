import React from 'react';
import SearchResult from './SearchResult/SearchResult';

import c from '../../Navigation.module.css';

const searchResults = (props) => {
    const searchResults = props.searchResults.map( (result,index) => {
        return <SearchResult key={index} result={result} />
    })

    return(
        <ul className={c.searchResults}>
            <li><span>Search Result</span></li>
            {searchResults}
        </ul>
    );
}

export default searchResults;