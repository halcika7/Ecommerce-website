import React, { Component } from 'react';

class Img extends Component {
	componentDidMount() {
		setTimeout(() => this.resizeAllGridItems(), 100);
		window.addEventListener('resize', this.resizeAllGridItems);
	}
	componentDidUpdate() {
		setTimeout(() => this.resizeAllGridItems(), 100);
	}
	componentWillUnmount() {
		window.removeEventListener('resize', this.resizeAllGridItems);
	}

	resizeAllGridItems = () => {
		document.querySelectorAll('.perviewImage').forEach(item => {
			const grid = document.querySelector('.pictures'),
				rowHeight = parseInt(
					window.getComputedStyle(grid).getPropertyValue('grid-auto-rows')
				),
				rowGap = parseInt(
					window.getComputedStyle(grid).getPropertyValue('grid-row-gap')
				),
				rowSpan = Math.ceil(
					(item.querySelector('img').getBoundingClientRect().height + rowGap) /
						(rowHeight + rowGap)
				);
			item.style.gridRowEnd = 'span ' + rowSpan;
		});
	};
	render() {
		setTimeout(() => this.resizeAllGridItems(), 100);
		return (
			<img
				src={this.props.picture}
				alt={this.props.picture}
				onClick={e => this.props.clicked(e, this.props.index)}
			/>
		);
	}
}
export default Img;
