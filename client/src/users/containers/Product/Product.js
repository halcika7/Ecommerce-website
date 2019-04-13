import React, { useState } from 'react';
import './Product.css';
import FooterSocialIcons from '../../components/UI/FooterSocialIcons/FooterSocialIcons';

const Product = props => {
    const [socialIcons] = useState([
        {link: '/', icon: 'fab fa-facebook-f'},
        {link: '/', icon: 'fab fa-twitter'},
        {link: '/', icon: 'fab fa-instagram'},
        {link: '/', icon: 'fab fa-pinterest'},
        {link: '/', icon: 'fab fa-dribbble'},
        {link: '/', icon: 'fab fa-google'}
    ])
    return (
        <React.Fragment>
            <div class="container-fluid breadcrum">
                <div class="container">
                    <div class="inline-nav">
                        <a href="{{route('home.index')}}">Home</a>
                        <i class="fas fa-long-arrow-alt-right"></i>
                        <a class="prevent-click" href="/">Shop</a>
                        <i class="fas fa-long-arrow-alt-right"></i>
                        <a class="prevent-click" href="/">Product_slug</a>
                    </div>
                </div>
            </div>

            <div class="container images">
                <div class="row">
                    <div class="col-md-8 pictures">
                        <img src="{{asset('/img/1.jpg')}}" alt="New Air Jordan Shoes" />
                        <img src="{{asset('/img/2.jpg')}}" alt="img/2.jpg" />
                        <img src="{{asset('/img/3.jpg')}}" alt="img/3.jpg" />
                        <img src="{{asset('/img/4.jpg')}}" alt="img/4.jpg" />
                        <img src="{{asset('/img/5.jpg')}}" alt="img/5.jpg" />
                        <img src="{{asset('/img/6.jpg')}}" alt="img/6.jpg" />
                        <img src="{{asset('/img/1.jpg')}}" alt="New Air Jordan Shoes" />
                        <img src="{{asset('/img/2.jpg')}}" alt="img/2.jpg" />
                        <img src="{{asset('/img/3.jpg')}}" alt="img/3.jpg" />
                        <img src="{{asset('/img/4.jpg')}}" alt="img/4.jpg" />
                        <img src="{{asset('/img/5.jpg')}}" alt="img/5.jpg" />
                        <img src="{{asset('/img/6.jpg')}}" alt="img/6.jpg" />
                    </div>
                    <div class="col-md-4 about-product">
                        <h4>Product name</h4>
                        <p class="category-name">Categoy</p>
                        <div class="review">
                            <div class="stars">
                                <div class="star">
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                </div>
                                <p>(34)reviews</p>
                            </div>
                            <span class="availability">
                                <span class="badge">In Stock</span>
                            </span>
                        </div>

                        <p class="old-price">
                            $2,999.00
                        </p>
                        <p class="new-price">
                            $1,999.00
                        </p>
                        <p class="description">
                            Vivamus in tempor eros. Phasellus rhoncus in nunc sit amet mattis. Integer in ipsum vestibulum, molestie arcu ac, efficitur tellus. Phasellus id vulputate erat.
                        </p>
                        <p class="sku"><span>SKU: </span>Lorem ipsum</p>

                        <div class="options">
                            <div class="row">
                                <div class="col-6">
                                    <select name="color" id="colors">
                                        <option value="white">White</option>
                                        <option value="white">White</option>
                                        <option value="white">White</option>
                                        <option value="white">White</option>
                                        <option value="white">White</option>
                                    </select>
                                </div>
                                <div class="col-6">
                                    <select name="color" id="colors">
                                        <option value="white">White</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="buttons">
                            <button href="#" class="btn btn-default add-to-cart">
                                <i class="fas fa-shopping-cart"></i> Add to Cart
                            </button>
                            <div class="row ">
                                <a href="/" class="compare"><i class="fas fa-sync"></i> Compare</a>
                                <button href="#" class="wishlist">
                                    <i class="fas fa-heart"></i> Wishlist
                                </button>
                            </div>
                        </div>
                        <FooterSocialIcons icons={socialIcons} />
                    </div>
                </div>
            </div>

            <div class="container-fluid about-product">
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="false">Description</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="true">Reviews</a>
                    </li>
                </ul>
                <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade" id="home" role="tabpanel" aria-labelledby="home-tab">
                        <div class="container">
                            <div class="row">
                                <div class="col description">
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum eaque, adipisci optio voluptatum est possimus error et quod, voluptates placeat alias illum vel quia iste commodi ratione ipsa nihil eveniet.
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi numquam, odio alias aliquam id odit reprehenderit deleniti quas    
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque neque reprehenderit beatae repellendus incidunt at, ipsum eum adipisci. Atque minima natus, ipsa quo repudiandae animi obcaecati iste mollitia? Impedit cupiditate velit blanditiis. Doloremque aut culpa mollitia id aspernatur placeat consequatur voluptates maxime odio rerum quis, ex sequi, libero rem nam asperiores animi repellendus! Nihil delectus assumenda perferendis libero doloribus enim qui, sit illum labore deserunt, nobis quas quia, ut ullam nulla inventore animi facilis doloremque. Ex quia molestiae corporis corrupti a modi repudiandae fuga dolorem accusantium aut debitis neque excepturi quaerat, vero accusamus! Rem quasi eaque, eligendi iste eius temporibus.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade show active" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                        <div class="container">
                            <div class="row" style={{ margin: '0px' }}>
                                <div class="col-md-6">
                                    <h5>Based on 3 reviews</h5>
                                    <div class="review-score">
                                        <div class="scores">
                                            <p class="number">4.3</p>
                                            <p class="text">Average Score</p>
                                        </div>
                                    </div>
                                    <ul>
                                        <li class="five-star">
                                            <span class="stars">
                                                <i class="fa fa-star"></i>
                                            
                                                <i class="fa fa-star"></i>
                                            
                                                <i class="fa fa-star"></i>
                                            
                                                <i class="fa fa-star"></i>
                                            
                                                <i class="fa fa-star"></i>
                                            </span>
                                            <span class="number-star" id="number-star-5">
                                                3
                                                <div class="progress">
                                                    <div class="progress-bar" role="progressbar" style={{width: '85%'}}></div>
                                                </div>
                                            </span>
                                        </li>
                                        <li class="four-star">
                                            <span class="stars">
                                                <i class="fa fa-star"></i>
                                            
                                                <i class="fa fa-star"></i>
                                            
                                                <i class="fa fa-star"></i>
                                            
                                                <i class="fa fa-star"></i>
                                            
                                                <i class="fa fa-star"></i>
                                            </span>
                                            <span class="number-star">
                                                4
                                                <div class="progress">
                                                    <div class="progress-bar" role="progressbar" style={{width: '25%'}}></div>
                                                </div>
                                            </span>
                                        </li>
                                        <li class="three-star">
                                            <span class="stars">
                                                <i class="fa fa-star"></i>
                                            
                                                <i class="fa fa-star"></i>
                                            
                                                <i class="fa fa-star"></i>
                                            
                                                <i class="fa fa-star"></i>
                                            
                                                <i class="fa fa-star"></i>
                                            </span>
                                            <span class="number-star">
                                                3
                                                <div class="progress">
                                                    <div class="progress-bar" role="progressbar" style={{width: '25%'}}></div>
                                                </div>
                                            </span>
                                        </li>
                                        <li class="two-star">
                                            <span class="stars">
                                                <i class="fa fa-star"></i>
                                            
                                                <i class="fa fa-star"></i>
                                            
                                                <i class="fa fa-star"></i>
                                            
                                                <i class="fa fa-star"></i>
                                            
                                                <i class="fa fa-star"></i>
                                            </span>
                                            <span class="number-star">
                                                2
                                                <div class="progress">
                                                    <div class="progress-bar" role="progressbar" style={{width: '25%'}}></div>
                                                </div>
                                            </span>
                                        </li>
                                        <li class="one-star">
                                            <span class="stars">
                                                <i class="fa fa-star"></i>
                                            
                                                <i class="fa fa-star"></i>
                                            
                                                <i class="fa fa-star"></i>
                                            
                                                <i class="fa fa-star"></i>
                                            
                                                <i class="fa fa-star"></i>
                                            </span>
                                            <span class="number-star">
                                                0
                                                <div class="progress">
                                                    <div class="progress-bar" role="progressbar" style={{width: '25%'}}></div>
                                                </div>
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                                <div class="col-md-6">
                                    <h5>Add a review</h5>
                                    <div class="user-rating">
                                        Your rating
                                        <div class="stars-rating">
                                            <span class="star" data-value="1">
                                                <i class="fa fa-star"></i>
                                            </span>
                                            <span class="star" data-value="2">
                                                <i class="fa fa-star"></i>
                                            </span>
                                            <span class="star" data-value="3">
                                                <i class="fa fa-star"></i>
                                            </span>
                                            <span class="star" data-value="4">
                                                <i class="fa fa-star"></i>
                                            </span>
                                            <span class="star" data-value="5">
                                                <i class="fa fa-star"></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="user-comment">
                                        <div class="wrapper-content-editabel">
                                            <div class="contenteditable" contenteditable="true" tabindex="5"></div>
                                            <div class="navbar-content-editable"></div>
                                        </div>
                                        <button class="btn btn-default add-comment">Add Review</button>
                                    </div>
                                </div>
                            </div>
                            <div class="row comments" style={{ margin: '0px' }}>
                                <div class="blog-post-comments">
                                    <ol class="blog-comment">
                                        <li class="comment">
                                            <div class="comment-author">
                                                <img src="{{asset('/img/profile5.jpg')}}" alt="" />
                                            </div>
                                            <div class="comment-text">
                                                <div class="top">
                                                    <span><b>Ali Tufan: </b></span>
                                                    <button class="like"><i class="fas fa-thumbs-up"></i>(50)</button>
                                                    <button class="dislike"><i class="fas fa-thumbs-down"></i>(4)</button>
                                                    <div class="stars-rating five-stars">
                                                        <span class="star">
                                                            <i class="fa fa-star"></i>
                                                        </span>
                                                        <span class="star">
                                                            <i class="fa fa-star"></i>
                                                        </span>
                                                        <span class="star">
                                                            <i class="fa fa-star"></i>
                                                        </span>
                                                        <span class="star">
                                                            <i class="fa fa-star"></i>
                                                        </span>
                                                        <span class="star">
                                                            <i class="fa fa-star"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div class="text">
                                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leaLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard took a galley of type and <b>Halcika</b>
                                                    scrambled it to make a type specimen book. It has survived not only five centuries, but also the leaLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leaLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the lea</p>
                                                </div>
                                                <div class="comment-footer">
                                                    <button>
                                                        <i class="fas fa-reply"></i> Reply
                                                    </button>
                                                    <button>
                                                        <i class="far fa-edit"></i>
                                                    </button>
                                                    <button>
                                                        <i class="fas fa-trash-alt"></i>
                                                    </button>
                                                    <button>
                                                        Replays(10)
                                                    </button>
                                                </div>
                                            </div>
                                            <li class="comment comment-sub">
                                                <div class="comment-author">
                                                    <img src="{{asset('/img/profile5.jpg')}}" alt="" />
                                                </div>
                                                <div class="comment-text">
                                                    <div class="top">
                                                        <span><b>Ali Tufan: </b></span>
                                                        <button class="like"><i class="fas fa-thumbs-up"></i>(50)</button>
                                                        <button class="dislike"><i class="fas fa-thumbs-down"></i>(4)</button>
                                                    </div>
                                                    <div class="text">
                                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the lea</p>
                                                    </div>
                                                    <div class="comment-footer">
                                                        <button>
                                                            <i class="fas fa-reply"></i> Reply
                                                        </button>
                                                        <button>
                                                            <i class="far fa-edit"></i>
                                                        </button>
                                                        <button>
                                                            <i class="fas fa-trash-alt"></i>
                                                        </button>
                                                        <button>
                                                            Replays(10)
                                                        </button>
                                                    </div>
                                                </div>
                                                <li class="comment comment-sub-sub">
                                                    <div class="comment-author">
                                                        <img src="{{asset('/img/profile5.jpg')}}" alt="" />
                                                    </div>
                                                    <div class="comment-text">
                                                        <div class="top">
                                                            <span><b>Ali Tufan: </b></span>
                                                            <button class="like"><i class="fas fa-thumbs-up"></i>(50)</button>
                                                            <button class="dislike"><i class="fas fa-thumbs-down"></i>(4)</button>
                                                        </div>
                                                        <div class="text">
                                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the lea</p>
                                                        </div>
                                                    </div>
                                                </li>
                                            </li>
                                        </li>
                                        <li class="comment">
                                            <div class="comment-author">
                                                <img src="{{asset('/img/profile5.jpg')}}" alt="" />
                                            </div>
                                            <div class="comment-text">
                                                <div class="top">
                                                    <span><b>Ali Tufan: </b></span>
                                                    <button class="like"><i class="fas fa-thumbs-up"></i>(50)</button>
                                                    <button class="dislike"><i class="fas fa-thumbs-down"></i>(4)</button>
                                                    <div class="stars-rating five-stars">
                                                        <span class="star">
                                                            <i class="fa fa-star"></i>
                                                        </span>
                                                        <span class="star">
                                                            <i class="fa fa-star"></i>
                                                        </span>
                                                        <span class="star">
                                                            <i class="fa fa-star"></i>
                                                        </span>
                                                        <span class="star">
                                                            <i class="fa fa-star"></i>
                                                        </span>
                                                        <span class="star">
                                                            <i class="fa fa-star"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div class="text">
                                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the lea</p>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="comment">
                                            <div class="comment-author">
                                                <img src="{{asset('/img/profile5.jpg')}}" alt="" />
                                            </div>
                                            <div class="comment-text">
                                                <div class="top">
                                                    <span><b>Ali Tufan: </b></span>
                                                    <button class="like"><i class="fas fa-thumbs-up"></i>(50)</button>
                                                    <button class="dislike"><i class="fas fa-thumbs-down"></i>(4)</button>
                                                    <div class="stars-rating five-stars">
                                                        <span class="star">
                                                            <i class="fa fa-star"></i>
                                                        </span>
                                                        <span class="star">
                                                            <i class="fa fa-star"></i>
                                                        </span>
                                                        <span class="star">
                                                            <i class="fa fa-star"></i>
                                                        </span>
                                                        <span class="star">
                                                            <i class="fa fa-star"></i>
                                                        </span>
                                                        <span class="star">
                                                            <i class="fa fa-star"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div class="text">
                                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the lea</p>
                                                </div>
                                            </div>
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Product;