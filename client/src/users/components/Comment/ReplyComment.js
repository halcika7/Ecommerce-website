import React, { useState, useEffect } from 'react';
import './Comment.css';
import TimeAgo from 'react-timeago';

const ReplyComment = props => {
	const [editcomment, setEditComment] = useState(false);
	const [editedReplyText, setEditedReplyText] = useState('');

	const buttonEditClicked = e => {
		e.preventDefault();
		setEditComment(!editcomment);
	};

	const editReplyText = e => setEditedReplyText(e.target.value);

	const submitEditedReply = e => {
		e.preventDefault();
		props.editReply({
			id: props.reply.reviewId._id,
			text: editedReplyText,
			reviewId: props.reviewId,
			callBack: props.push
		});
		setEditComment(false);
	};

	useEffect(() => {
		setEditedReplyText(props.reply.reviewId.text);
	}, [editcomment]);

	const deleteReply = e => {
		e.preventDefault();
		props.deleteReply({ id: props.reply.reviewId._id, userId: props.userId, callBack: props.push });
	};

	return (
		<div className="comment comment-sub">
			<div className="comment-author d-sm-block d-none">
				<img src={props.reply.userId.profilePicture} alt="" />
			</div>
			<div className="comment-text">
				<div className="top">
					<span>
						<b>{props.reply.userId.username} </b>
					</span>
					<button className="like">
						<i className="fas fa-thumbs-up" />(
						{props.reply.reviewId.likes.length})
					</button>
					<button className="dislike">
						<i className="fas fa-thumbs-down" />(
						{props.reply.reviewId.dislikes.length})
					</button>
				</div>
				{!editcomment && (
					<div
						className="text"
						dangerouslySetInnerHTML={{ __html: props.reply.reviewId.text }}
					/>
				)}
				{editcomment && (
					<textarea
						className="text"
						placeholder="Edit Reply Comment"
						value={editedReplyText}
						onChange={editReplyText}
					/>
				)}
				<span className="time-ago">
					<TimeAgo date={props.reply.reviewId.createdAt} />
				</span>
				<div className="comment-footer">
					{props.reply.userId._id === props.userId && (
						<React.Fragment>
							<button type="button" onClick={buttonEditClicked}>
								<i className="far fa-edit" />
							</button>
							<button onClick={deleteReply}>
								<i className="fas fa-trash-alt" />
							</button>
							{editcomment && (
								<button type="button" onClick={submitEditedReply}>
									Submit Edited Review
								</button>
							)}
						</React.Fragment>
					)}
				</div>
			</div>
		</div>
	);
};

export default ReplyComment;
