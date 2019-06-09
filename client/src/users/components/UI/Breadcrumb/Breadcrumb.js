import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ links }) => {
	return (
		<div className="container-fluid breadcrum">
			<div className="container">
				<div className="inline-nav">
					{links.map((link, index, length) =>
						index !== length.length - 1 ? (
							<React.Fragment key={index}>
								<Link to={link.link}>{link.value}</Link>
								<i className="fas fa-long-arrow-alt-right" />
							</React.Fragment>
						) : (
							<React.Fragment key={index}>
								<Link to={link.link}>{link.value}</Link>
							</React.Fragment>
						)
					)}
				</div>
			</div>
		</div>
	);
};

export default Breadcrumb;
