import React, { useEffect } from 'react';
import StoreActivities from './StoreActivities/StoreActivities';

import c from './About.module.css';
import { Link } from 'react-router-dom';
import image from '../../assets/images/img4.jpg';

const state = {
	activities: [
		{
			heading: 'hedingosakd',
			paragraph:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempor, metus eget sagittis aliquam, lorem enim malesuada mauris, sit amet tincidunt eros lectus ac tortor.'
		},
		{
			heading: 'hedingosakd',
			paragraph:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempor, metus eget sagittis aliquam, lorem enim malesuada mauris, sit amet tincidunt eros lectus ac tortor.'
		},
		{
			heading: 'hedingosakd',
			paragraph:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempor, metus eget sagittis aliquam, lorem enim malesuada mauris, sit amet tincidunt eros lectus ac tortor.'
		},
		{
			heading: 'hedingosakd',
			paragraph:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempor, metus eget sagittis aliquam, lorem enim malesuada mauris, sit amet tincidunt eros lectus ac tortor.'
		},
		{
			heading: 'hedingosakd',
			paragraph:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempor, metus eget sagittis aliquam, lorem enim malesuada mauris, sit amet tincidunt eros lectus ac tortor.'
		},
		{
			heading: 'hedingosakd',
			paragraph:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempor, metus eget sagittis aliquam, lorem enim malesuada mauris, sit amet tincidunt eros lectus ac tortor.'
		}
	],

	directors: [
		{
			name: 'Haris Beslic',
			position: 'Ceo/Founder',
			image: 'imgJordan.jpg',
			icons: [
				{ link: '/', icon: 'fab fa-facebook-f' },
				{ link: '/', icon: 'fab fa-twitter' },
				{ link: '/', icon: 'fab fa-instagram' },
				{ link: '/', icon: 'fab fa-pinterest' },
				{ link: '/', icon: 'fab fa-dribbble' },
				{ link: '/', icon: 'fab fa-google' }
			]
		},
		{
			name: 'Ilma Huseinovic',
			position: 'Ceo',
			image: 'img3.png',
			icons: [
				{ link: '/', icon: 'fab fa-facebook-f' },
				{ link: '/', icon: 'fab fa-twitter' },
				{ link: '/', icon: 'fab fa-instagram' },
				{ link: '/', icon: 'fab fa-pinterest' },
				{ link: '/', icon: 'fab fa-dribbble' },
				{ link: '/', icon: 'fab fa-google' }
			]
		},
		{
			name: 'Haris Beslic',
			position: 'Ceo/Founder',
			image: 'img4.jpg',
			icons: [
				{ link: '/', icon: 'fab fa-facebook-f' },
				{ link: '/', icon: 'fab fa-twitter' },
				{ link: '/', icon: 'fab fa-instagram' },
				{ link: '/', icon: 'fab fa-pinterest' },
				{ link: '/', icon: 'fab fa-dribbble' },
				{ link: '/', icon: 'fab fa-google' }
			]
		},
		{
			name: 'Haris Beslic',
			position: 'Ceo/Founder',
			image: 'jordan.png',
			icons: [
				{ link: '/', icon: 'fab fa-facebook-f' },
				{ link: '/', icon: 'fab fa-twitter' },
				{ link: '/', icon: 'fab fa-instagram' },
				{ link: '/', icon: 'fab fa-pinterest' },
				{ link: '/', icon: 'fab fa-dribbble' },
				{ link: '/', icon: 'fab fa-google' }
			]
		},
		{
			name: 'Haris Beslic',
			position: 'Ceo/Founder',
			image: 'jordan2.png',
			icons: [
				{ link: '/', icon: 'fab fa-facebook-f' },
				{ link: '/', icon: 'fab fa-twitter' },
				{ link: '/', icon: 'fab fa-instagram' },
				{ link: '/', icon: 'fab fa-pinterest' },
				{ link: '/', icon: 'fab fa-dribbble' },
				{ link: '/', icon: 'fab fa-google' }
			]
		},
		{
			name: 'Haris Beslic',
			position: 'Ceo/Founder',
			image: 'balck2.jpg',
			icons: [
				{ link: '/', icon: 'fab fa-facebook-f' },
				{ link: '/', icon: 'fab fa-twitter' },
				{ link: '/', icon: 'fab fa-instagram' },
				{ link: '/', icon: 'fab fa-pinterest' },
				{ link: '/', icon: 'fab fa-dribbble' },
				{ link: '/', icon: 'fab fa-google' }
			]
		},
		{
			name: 'Haris Beslic',
			position: 'Ceo/Founder',
			image: 'imgJordan.jpg',
			icons: [
				{ link: '/', icon: 'fab fa-facebook-f' },
				{ link: '/', icon: 'fab fa-twitter' },
				{ link: '/', icon: 'fab fa-instagram' },
				{ link: '/', icon: 'fab fa-pinterest' },
				{ link: '/', icon: 'fab fa-dribbble' },
				{ link: '/', icon: 'fab fa-google' }
			]
		}
	],

	otherEmployees: [
		{
			name: 'Haris Beslic',
			position: 'Ceo/Founder',
			image: 'imgJordan.jpg'
		},
		{
			name: 'Ilma Huseinovic',
			position: 'Ceo',
			image: 'imgJordan.jpg'
		},
		{
			name: 'Haris Beslic',
			position: 'Ceo/Founder',
			image: 'imgJordan.jpg'
		},
		{
			name: 'Haris Beslic',
			position: 'Ceo/Founder',
			image: 'imgJordan.jpg'
		},
		{
			name: 'Haris Beslic',
			position: 'Ceo/Founder',
			image: 'imgJordan.jpg'
		},
		{
			name: 'Haris Beslic',
			position: 'Ceo/Founder',
			image: 'imgJordan.jpg'
		},
		{
			name: 'Haris Beslic',
			position: 'Ceo/Founder',
			image: 'imgJordan.jpg'
		}
	]
};
const About = props => {
	useEffect(() => {
		document.title = 'About';
	}, []);

	return (
		<React.Fragment>
			<div className="container-fluid breadcrum">
				<div className="container">
					<div className="inline-nav">
						<Link to="/">Home</Link>
						<i className="fas fa-long-arrow-alt-right" />
						<a className="prevent-click" href="/">
							About
						</a>
					</div>
				</div>
			</div>

			<div className={c.container + ' container about ' + c.about}>
				<div className={c.row + ' row'}>
					<div className={c.colmd6 + ' col-md-6'}>
						<img src={image} alt="" />
					</div>
					<div className={c.colmd6 + ' col-md-6'}>
						<div className={c.abouttext}>
							<h5>There are many variations of passages</h5>
							<p>
								Nulla accumsan risus ut elit rutrum, tempor tincidunt sem
								blandit. Praesent porttitor ex et tempus congue. Ut a velit
								ornare, accumsan lacus ut, rutrum metus. In finibus turpis ac mi
								ultricies, ac tincidunt justo tincidunt. Praesent lacinia
								laoreet viverra.
								<span>
									In finibus turpis ac mi ultricies, ac tincidunt justo
									tincidunt. Praesent lacinia laoreet viverra.
								</span>
							</p>
							<p>
								Nulla accumsan risus ut elit rutrum, tempor tincidunt sem
								blandit. Praesent porttitor ex et tempus congue. Ut a velit
								ornare, accumsan lacus ut, rutrum metus. In finibus turpis ac mi
								ultricies, ac tincidunt justo tincidunt. Praesent lacinia
								laoreet viverra.
								<span>
									In finibus turpis ac mi ultricies, ac tincidunt justo
									tincidunt. Praesent lacinia laoreet viverra.
								</span>
							</p>
						</div>
					</div>
				</div>
			</div>

			<StoreActivities activities={state.activities} />
		</React.Fragment>
	);
};

export default About;
