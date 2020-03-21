/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import classes from './TagsInput.module.css';

const TagsInput = props => {
	const [tags, setTags] = useState([]);
	const [listItems, setListItems] = useState([]);

	useEffect(() => {
		setValues();
		document.addEventListener('click', e => handleDocumentClick(e));
		return () => {
			document.removeEventListener('click', handleDocumentClick);
			setTags([]);
			setListItems([]);
		};
	}, []);

	useEffect(() => {
		setValues();
	}, [props]);

	const setValues = () => {
		const loadTags = [];
		const newListItems = [];
		props.values.forEach(perm => newListItems.push({ ...perm }));
		let i = 0;
		for (const obj in props.choosenValues) {
			loadTags.push({ name: props.choosenValues[obj], index: i });
			const tagIndex = newListItems.findIndex(
				tag => tag.permission === props.choosenValues[obj]
			);
			if (tagIndex !== -1) {
				newListItems[tagIndex].disabled = true;
			}
			i++;
		}
		setListItems(newListItems);
		setTags(loadTags);
	};

	const listItemOnClick = e => {
		e.preventDefault();
		const input = document.querySelector('.' + classes.Input);
		const name = e.target.getAttribute('data-name');
		setTags([...tags, { name, index: e.target.getAttribute('data-index') }]);
		props.setChoosenValues([...props.choosenValues, name]);
		document
			.querySelectorAll('.' + classes.List + ' label')
			.forEach(item => item.removeAttribute('style'));
		const newListItems = [...listItems];
		newListItems[e.target.getAttribute('data-index')].disabled = true;
		setListItems([...newListItems]);
		input.value = '';
		input.blur();
	};

	const tagOnClick = e => {
		e.preventDefault();
		const targetDisabled = e.currentTarget.getAttribute('data-disabled');
		if (targetDisabled) {
			return;
		}
		const targetName = e.currentTarget.getAttribute('data-name');
		const newTags = [...tags];
		const newListItems = [...listItems];
		const tagIndex = newTags.findIndex(tag => tag.name === targetName);
		const listItemIndex = newListItems.findIndex(
			tag => tag.permission === targetName
		);
		delete newListItems[listItemIndex].disabled;
		setListItems([...newListItems]);
		newTags.splice(tagIndex, 1);
		setTags([...newTags]);
		const newChoosenValues = [...props.choosenValues];
		newChoosenValues.splice(tagIndex, 1);
		props.setChoosenValues(newChoosenValues);
	};

	const onInputChange = e => {
		e.preventDefault();
		const listItems = document.querySelectorAll('.' + classes.List + ' label');
		listItems.forEach(item => {
			const name = item.getAttribute('data-name').toLowerCase();
			const searchValue = e.target.value.toLowerCase();
			if (!name.includes(searchValue)) {
				item.style.display = 'none';
			} else {
				item.removeAttribute('style');
			}
		});
	};

	const handleDocumentClick = e => {
		if (!e.target.closest('.modalLabel')) {
			const list = document.querySelector('.Ul');
			if (list) {
				if (list.classList.contains(classes.Focused)) {
					list.classList.remove(classes.Focused);
				}
			}
		}
	};

	return (
		<label className={'modalLabel d-block ' + classes.modalLabel}>
			<ul className={classes.Ul + ' Ul'}>
				{tags.map((tag, index) => (
					<li
						key={index}
						data-name={tag.name}
						onClick={tagOnClick}
						data-disabled={props.disabled}>
						{tag.name}
						<i className="fas fa-times" />
					</li>
				))}
				{tags.length === listItems.length || props.disabled ? null : (
					<input
						className={classes.Input}
						onFocus={e =>
							e.currentTarget.parentElement.classList.add(classes.Focused)
						}
						onChange={onInputChange}
						placeholder="Search for"
						disabled={props.disabled}
					/>
				)}
			</ul>
			<div className={classes.List}>
				{listItems.map((val, index) => {
					if (val.disabled === true) return null;
					return (
						<label
							key={val._id}
							data-name={val.permission}
							data-index={index}
							onClick={listItemOnClick}>
							{val.permission}
						</label>
					);
				})}
			</div>
		</label>
	);
};

export default TagsInput;
