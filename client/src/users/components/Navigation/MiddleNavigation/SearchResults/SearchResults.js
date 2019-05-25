import React from 'react';
import { Link } from 'react-router-dom';
 
import c from '../../Navigation.module.css';
import SmallSpinner from '../../../UI/SmallSpinner/SmallSpinner';

const searchResults = props => {

    return(
        <ul className={c.searchResults}>
            {props.loading ?
                 <SmallSpinner /> :
                <React.Fragment>
                    {props.searchResults.length === 0 ?
                        <li><span>No Products found</span></li> :
                        <React.Fragment>
                            <li><span>Search Result</span></li>
                            {props.searchResults.map( ( product, index ) =>
                                <li className="result" key={index}>
                                <Link to={`/product?id=${product._id}`} >
                                    <img src={product.first} alt={product.first} />
                                    <div className={c.productInfo}>
                                        <p>{product.name}</p>
                                        <div className={c.price}>
                                            <p>Starting from: ${product.price}</p>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                            )}
                        </React.Fragment>
                    }       
                </React.Fragment>}
        </ul>
    );
}

export default searchResults;