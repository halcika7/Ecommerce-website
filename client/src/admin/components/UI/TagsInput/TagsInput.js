import React, { useState, useEffect } from 'react';
import classes from './TagsInput.module.css';

const TagsInput = props => {
    const [tags, setTags] = useState([]);
    const [listItems, setListItems] = useState([]);

    useEffect(() => { 
        setListItems(props.values);
        document.addEventListener('click', e => handleDocumentClick(e));
        return () => document.removeEventListener('click', handleDocumentClick);
    }, []);

    useEffect(() => {
        setListItems(props.values);
    }, [props.values]);
    
    useEffect(() => {
        const loadTags = [];
        const newListItems = [...props.values];
        let i = 0;
        for(const obj in props.choosenValues) {
            loadTags.push({ name: obj, index: i });
            const tagIndex = newListItems.findIndex(tag => tag.permission === obj);
            if(tagIndex !== -1) {
                newListItems[tagIndex].disabled = true;
            }
            i++;
        }
        setListItems([ ...newListItems ]);
        setTags(loadTags);
    }, [props.choosenValues]);

    const listItemOnClick = e => {
        e.preventDefault();
        const input = document.querySelector('.' + classes.Input);
        setTags([ ...tags, {name: e.target.getAttribute('data-name'), index: e.target.getAttribute('data-index')} ]);
        props.setChoosenValues({ ...props.choosenValues, [e.target.getAttribute('data-name')]: true });
        document.querySelectorAll('.' + classes.List + ' label').forEach(item => item.removeAttribute('style'));
        const newListItems = [...listItems];
        newListItems[e.target.getAttribute('data-index')].disabled = true;
        setListItems([ ...newListItems ]);
        input.value = '';
        input.blur();
    }

    const tagOnClick = e => {
        e.preventDefault();
        const targetName = e.currentTarget.getAttribute('data-name');
        const newTags = [...tags];
        const newListItems = [...listItems];
        const tagIndex = newTags.findIndex(tag => tag.name === targetName);
        const listItemIndex = newListItems.findIndex(tag => tag.permission === targetName);
        delete newListItems[listItemIndex].disabled;
        setListItems([...newListItems]);
        newTags.splice(tagIndex,1);
        setTags([...newTags]);
        const newChoosenValues = { ...props.choosenValues };
        delete newChoosenValues[e.target.getAttribute('data-name')];
        props.setChoosenValues({ ...newChoosenValues });
    }

    const onInputChange = e => {
        e.preventDefault();
        const listItems = document.querySelectorAll('.' + classes.List + ' label');
        listItems.forEach(item => {
            const name = item.getAttribute('data-name').toLowerCase();
            const searchValue = e.target.value.toLowerCase();
            if(! name.includes(searchValue)) {
                item.style.display = 'none';
            }else{
                item.removeAttribute('style');
            }
        });
    }

    const handleDocumentClick = e => {
        if(!e.target.closest('.modalLabel')){
            const list = document.querySelector('.Ul');
            if(list) {
                if(list.classList.contains(classes.Focused)) 
                    list.classList.remove(classes.Focused);
            }
        }
    }

    return (
        <label className={"modalLabel d-block " + classes.modalLabel}>
            <ul className={classes.Ul + " Ul"}>
                {tags.map((tag, index) => (
                    <li key={index} 
                        data-name={tag.name}
                        onClick={tagOnClick}>
                        {tag.name}
                        <i className="fas fa-times"></i>
                    </li>
                ))}
                {tags.length === listItems.length ? null : 
                <input className={classes.Input} 
                        onFocus={e => e.currentTarget.parentElement.classList.add(classes.Focused)}
                        onChange={onInputChange}
                        placeholder="Search for"/>}
            </ul>
            <div className={classes.List}>
                {listItems.map((val,index) => {
                    if(val.disabled === true) return null;
                    return (<label
                        key={val._id} 
                        data-name={val.permission}
                        data-index={index}
                        onClick={listItemOnClick}>{val.permission}</label>)
                })}
            </div>
        </label>
    );
}

export default TagsInput;