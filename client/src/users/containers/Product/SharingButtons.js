import React from 'react';
import {
	FacebookShareButton,
	LinkedinShareButton,
	TwitterShareButton,
	PinterestShareButton,
	WhatsappShareButton,
	RedditShareButton,
	EmailShareButton,
	FacebookIcon,
	TwitterIcon,
	LinkedinIcon,
	PinterestIcon,
	WhatsappIcon,
	RedditIcon,
	EmailIcon
} from 'react-share';

const SharingButtons = ({ link }) => {
	return (
		<div className="social-links">
			<label className="Demo__some-network">
				<FacebookShareButton url={link}>
					<FacebookIcon size={32} round />
				</FacebookShareButton>
			</label>
			<label className="Demo__some-network">
				<TwitterShareButton url={link}>
					<TwitterIcon size={32} round />
				</TwitterShareButton>
			</label>
			<label className="Demo__some-network">
				<WhatsappShareButton url={link} separator=":: ">
					<WhatsappIcon size={32} round />
				</WhatsappShareButton>
			</label>
			<label className="Demo__some-network">
				<LinkedinShareButton url={link} windowWidth={750} windowHeight={600}>
					<LinkedinIcon size={32} round />
				</LinkedinShareButton>
			</label>
			<label className="Demo__some-network">
				<PinterestShareButton
					url={String(window.location)}
					media={'sdfdsfsd'}
					windowWidth={1000}
					windowHeight={730}>
					<PinterestIcon size={32} round />
				</PinterestShareButton>
			</label>
			<label className="Demo__some-network">
				<RedditShareButton
					url={link}
					title={'title'}
					windowWidth={660}
					windowHeight={460}>
					<RedditIcon size={32} round />
				</RedditShareButton>
			</label>
			<label className="Demo__some-network">
				<EmailShareButton url={link} subject={'title'} body="body">
					<EmailIcon size={32} round />
				</EmailShareButton>
			</label>
		</div>
	);
};

export default SharingButtons;
