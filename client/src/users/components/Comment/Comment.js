import React, { useState, useEffect } from 'react';
import './Comment.css';
import ReplyComment from './ReplyComment';
import TimeAgo from 'react-timeago';

const Comment = props => {
	const [editcomment, setEditComment] = useState(false);
	const [showReply, setShowReply] = useState(false);
	const [showReplyComments, setShowReplyComments] = useState(false);
	const [editedReviewText, setEditedReviewText] = useState('');
	const [replyText, setReplyText] = useState('');

	useEffect(() => {
		setEditedReviewText(props.review.text);
	}, [editcomment]);

	const buttonEditClicked = e => {
		e.preventDefault();
		setEditComment(!editcomment);
	};

	const editReviewText = e => setEditedReviewText(e.target.value);

	const onSubmitReply = e => {
		e.preventDefault();
		props.addReply({
			text: replyText,
			userId: props.userId,
			reviewId: props.review._id
		});
		setReplyText('');
		setShowReply(false);
		setShowReplyComments(true);
	};

	const deleteReview = e => {
		e.preventDefault();
		props.deleteReview({
			id: props.review._id,
			userId: props.userId,
			productId: props.review.productId
		});
	};

	const submitEditedReview = e => {
		e.preventDefault();
		props.editReview({ id: props.review._id, text: editedReviewText });
		setEditComment(false);
	};

	return (
		<li className="comment">
			<div className="comment-author d-sm-block d-none">
				<img
					src={props.review.userId.profilePicture}
					alt={props.review.userId.username}
				/>
			</div>
			<div className="comment-text">
				<div className="top">
					<span>
						<b>{props.review.userId.username}: </b>
					</span>
					<button className="like">
						<i className="fas fa-thumbs-up" />
						{props.review.likes.length}
					</button>
					<button className="dislike">
						<i className="fas fa-thumbs-down" />
						{props.review.dislikes.length}
					</button>
					<div className={'stars-rating stars-' + props.review.rating}>
						<span className="star">
							<i className="fa fa-star" />
						</span>
						<span className="star">
							<i className="fa fa-star" />
						</span>
						<span className="star">
							<i className="fa fa-star" />
						</span>
						<span className="star">
							<i className="fa fa-star" />
						</span>
						<span className="star">
							<i className="fa fa-star" />
						</span>
					</div>
				</div>
				{!editcomment && (
					<div
						className="text"
						dangerouslySetInnerHTML={{ __html: props.review.text }}
					/>
				)}
				{editcomment && (
					<textarea
						className="text"
						placeholder="Edit Review Comment"
						value={editedReviewText}
						onChange={editReviewText}
					/>
				)}
				<span className="time-ago">
					<TimeAgo date={props.review.createdAt} />
				</span>
				{showReply && (
					<textarea
						className="text"
						placeholder="Enter Reply Comment"
						onChange={e => setReplyText(e.target.value)}
					/>
				)}
				{replyText.length > 0 && showReply && (
					<button type="button" onClick={onSubmitReply}>
						Submit Reply
					</button>
				)}
				<div className="comment-footer">
					{props.userId && (
						<button type="button" onClick={() => setShowReply(!showReply)}>
							<i className="fas fa-reply" /> Reply
						</button>
					)}
					{props.review.userId._id === props.userId && (
						<React.Fragment>
							<button type="button" onClick={buttonEditClicked}>
								<i className="far fa-edit" />
							</button>
							<button onClick={deleteReview}>
								<i className="fas fa-trash-alt" />
							</button>
							{editcomment && (
								<button type="button" onClick={submitEditedReview}>
									Submit Edited Review
								</button>
							)}
						</React.Fragment>
					)}
					{props.review.replys.length > 0 && (
						<button onClick={e => setShowReplyComments(!showReplyComments)}>
							Replays({props.review.replys.length})
						</button>
					)}
				</div>
			</div>
			{props.review.replys.length > 0 &&
				showReplyComments &&
				props.review.replys.map((reply, index) => (
					<ReplyComment
						reply={reply}
						reviewId={props.review._id}
						userId={props.userId}
						key={index}
						showReplyComments={showReplyComments}
						editReply={props.editReply}
						deleteReply={props.deleteReply}
					/>
				))}
		</li>
	);
};

export default Comment;
