import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { addReview } from '../../../../store/actions';
import ResponseMessage from '../../../components/UI/ResponseMessages/ResponseMessages';

const AddReview = props => {

    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [productRatings, setProductRatings] = useState([]);

    useEffect(() => {
        setProductRatings(props.ratings)
    }, [props.ratings]);

    const starOnClick = e => setRating(parseInt(e.currentTarget.dataset.value));

    const addReview = e => {
        e.preventDefault();
        props.addReview({ productId: props.productId, userId: props.userId, rating, text: reviewText });
        setRating(0);
        setReviewText('');
    }

    const textareaChange = e => {
        e.preventDefault();
        setReviewText(e.currentTarget.value);
    }

    return (
        <div className="row" style={{ margin: '0px' }}>
            {props.successMessage && 
                <ResponseMessage message={props.successMessage} />
            }
            {props.failedMessage && 
                <ResponseMessage ClassName="Danger" message={props.failedMessage} />
            }
            <div className="col-md-6">
                <h5>Based on {productRatings.numOfReviews} reviews</h5>
                <div className="review-score">
                    <div className="scores">
                        <p className="number">{productRatings.avg ? productRatings.avg : 0}</p>
                        <p className="text">Average Score</p>
                    </div>
                </div>
                <ul>
                    {productRatings.ratingsWithPercentages && productRatings.ratingsWithPercentages.map(rating => 
                        <li className={"star-"+rating._id} key={rating._id}>
                            <span className="stars">
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                            </span>
                            <span className="number-star" id="number-star-5">
                                {rating.count}
                                <div className="progress">
                                    <div className="progress-bar" role="progressbar" style={rating.percent ? {width: rating.percent+'%'} : {width: '0%'}}></div>
                                </div>
                            </span>
                        </li>
                    )}
                </ul>
            </div>
            <div className="col-md-6">
                <h5>Add a review</h5>
                <div className="user-rating">
                    Your rating
                    <div className="stars-rating">
                        <span className={rating > 4 ? "star star-color" : 'star'} data-value="5" onClick={starOnClick}><i className="fa fa-star"></i></span>
                        <span className={rating > 3 ? "star star-color" : 'star'} data-value="4" onClick={starOnClick}><i className="fa fa-star"></i></span>
                        <span className={rating > 2 ? "star star-color" : 'star'} data-value="3" onClick={starOnClick}><i className="fa fa-star"></i></span>
                        <span className={rating > 1 ? "star star-color" : 'star'} data-value="2" onClick={starOnClick}><i className="fa fa-star"></i></span>
                        <span className={rating > 0 ? "star star-color" : 'star'} data-value="1" onClick={starOnClick}><i className="fa fa-star"></i></span>
                    </div>
                </div>
                <div className="user-comment">
                    <div className="wrapper-content-editabel">
                        <textarea 
                            className="contenteditable" 
                            onChange={textareaChange}
                            value={reviewText}
                            >
                        </textarea>
                        <div className="navbar-content-editable"></div>
                    </div>
                    {props.userId && <button className="btn btn-default add-comment" type='button' onClick={addReview}>Add Review</button>}
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        userId: state.login.User.id,
        ratings: state.reviews.productRatings,
        successMessage: state.reviews.successMessage,
        failedMessage: state.reviews.failedMessage
    }
}

const dispatchToProps = dispatch => {
    return {
        addReview: (reviewObject) => dispatch(addReview(reviewObject))
    }
}

export default connect(mapStateToProps, dispatchToProps)(AddReview);