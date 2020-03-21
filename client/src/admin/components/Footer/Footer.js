import React from 'react';

const AdminFooter = () => {
	return (
		<footer className="custome-dark p-4 custom-shadow">
			<div className="row">
				<div className="col-md-6">
					<div className="text-center text-md-left text-white">
						<p className="mb-0">
							{' '}
							© Copyright <span id="copyright"> 2019</span>. HalcStore All
							Rights Reserved.{' '}
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default AdminFooter;
