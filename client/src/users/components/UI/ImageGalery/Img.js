import React, { Component } from 'react';

class Img extends Component {
	render() {
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
