import React from 'react';
import c from './ContactForm.module.css';

const contactForm = props => {
	return (
		<React.Fragment>
			<h5 className={c.heading}>Leave us a Message</h5>
			<p className={c.text}>
				Lorem Ipsum is simply dummy text of the printing and typesetting
				industry. Lorem Ipsum has been the industry's standard dummy text ever
				since the 1500s, when an unknown printer took a galley of type and
				scrambled it
			</p>
			<form>
				<div className={c.inputgroup}>
					<label>Full Name*</label>
					<input
						type="text"
						name="name"
						id="contact_name"
						placeholder="Enter Full Name"
						required
					/>
				</div>
				<div className={c.inputgroup}>
					<label>Email*</label>
					<input
						type="email"
						name="email"
						id="contact_email"
						placeholder="Enter Email"
						required
					/>
				</div>
				<div className={c.inputgroup}>
					<label>Subject*</label>
					<input
						type="text"
						name="subject"
						id="contact_subject"
						placeholder="Subject"
						required
					/>
				</div>
				<div className={c.inputgroup}>
					<label>Comment*</label>
					<textarea
						name="comment"
						id="contact_comment"
						cols="30"
						rows="5"
						required
					/>
				</div>
			</form>
			<button className={c.btn + ' btn btn-lg ' + c.btnlg}>SEND</button>
		</React.Fragment>
	);
};

export default React.memo(contactForm);
