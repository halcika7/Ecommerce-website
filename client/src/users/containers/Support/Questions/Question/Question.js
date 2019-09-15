import React from 'react';
import c from './Question.module.css';

const question = props => {
	const toggleAnswer = (event, classAct) => {
		event.preventDefault();
		const parent = event.currentTarget;
		parent.classList.toggle(classAct);

		let height = null,
			autoHeight = null;
		let s = parent.parentElement.children[1];

		if (s.classList.contains('show')) {
			autoHeight = s.offsetHeight;
			height = s.offsetHeight;
			let animate = setInterval(() => {
				height -= autoHeight / 17;
				s.style.height = height + 'px';
				if (height <= 1) {
					clearInterval(animate);
					s.style = '';
					s.classList.remove('show');
				}
			}, 20);
		} else {
			s.classList = 'collapse show';
			autoHeight = s.offsetHeight;
			s.style.height = '0px';
			s.classList = 'collapsing';
			height = 0;
			let animate = setInterval(() => {
				height += autoHeight / 17;
				s.style.height = height + 'px';
				if (height >= autoHeight) {
					clearInterval(animate);
					s.style = '';
				}
			}, 20);

			s.classList = 'collapse show';
		}
	};
	return (
		<div className={c.col12 + ' col-12'}>
			<div
				className={c.accordionlink + ' accordion-link'}
				onClick={e => toggleAnswer(e, c.active)}>
				<a href="/" className="">
					{props.question.question}
				</a>
			</div>

			<div className={'collapse'}>
				<div className={c.answer}>{props.question.answer}</div>
			</div>
		</div>
	);
};

export default React.memo(question);
