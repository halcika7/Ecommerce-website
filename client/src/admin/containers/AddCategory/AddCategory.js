import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import classes from './AddCategory.module.css';
import TagsInput2 from '../../components/UI/TagsInput/TagsInput2';
import LoginRegisterInputs from '../../../users/components/UI/LoginRegisterInputs/LoginRegisterInputs';
import SmallSpinner from '../../../users/components/UI/SmallSpinner/SmallSpinner';
import ResponseMessages from '../../../users/components/UI/ResponseMessages/ResponseMessages';

const AddCategory = props => {
    const [catName, setCatName] = useState('');
    const [subCatName, setSubCatName] = useState('');
    const [iconName, setIconName] = useState(false);
    const [subCategories, setSubCategories] = useState([]);
    const [allSubCategories, setAllSubCategories] = useState([]);
    const [catNameError, setCatNameError] = useState('');
    const [subCatNameError, setSubCatNameError] = useState('');
    const [inputErrors, setInputErrors] = useState([]);

    useEffect(() => { startFunction(); }, []);

    useEffect(() => { startFunction(); }, [props.addcategory, props.viewcategory, props.editcategory]);

    useEffect(() => {
        setCatName(props.category.categoryData.name);
        setIconName(props.category.categoryData.icon);
        setAllSubCategories(props.category.categoryData.subcategories);
    }, [props.category.categoryData]);

    useEffect(() => { setCatNameError(props.category.error); }, [props.category.error]);

    const addSubCategory = e => {
        e.preventDefault();
        if(subCatName.length < 5) {
            setSubCatNameError('Name must be atleast 5 characters !');
            return;
        }
        if(subCategories.length < 1) {
            setSubCatNameError('At least one subcategory required!');
            return;
        }
        const newAllSubCategories = [...allSubCategories];
        newAllSubCategories.push({ name: subCatName, subcategories: subCategories });
        setAllSubCategories(newAllSubCategories);
        setSubCatName('');
        setSubCategories('');
        setSubCatNameError('');
    }

    const addCategory = e => {
        e.preventDefault();
        if(catName.length < 5) {
            setCatNameError('Name must be atleast 5 characters !');
            return;
        }else {
            setCatNameError('');
        }
        const catData = { name: catName, icon: iconName, subcategories: allSubCategories };
        setCatName('');
        setSubCatName('');
        setSubCategories([]);
        setAllSubCategories([]);
        if(props.addcategory){
            props.addCategory(catData);
        }

        if(props.editcategory) {
            const id = new URLSearchParams(props.location.search).get('id'); 
            props.editCategory(id, catData);
        }
    }

    const deleteSubCategory = index => {
        const newAllSubCategories = [...allSubCategories];
        newAllSubCategories.splice(index, 1);
        setAllSubCategories(newAllSubCategories);
    }

    const deleteTagSubcategory = (subCatIndex, tagIndex) => {
        const newAllSubCategories = [...allSubCategories];
        newAllSubCategories[subCatIndex].subcategories.splice(tagIndex, 1);
        if(newAllSubCategories[subCatIndex].subcategories.length < 1) {
            delete newAllSubCategories[subCatIndex];
        }
        setAllSubCategories(newAllSubCategories);
    }

    const onInputKeyDown = (e, index) => {
        if(e.key === "Enter") {
            const errors = [...inputErrors];
            if(e.target.value.length < 5) {
                errors[index] = `Name must be at least 5 characters ${index} !`;
                setInputErrors(errors);
                return;
            }else {
                errors.splice(index, 1);
                setInputErrors(errors);
            }
            const newAllSubCategories = [...allSubCategories];
            newAllSubCategories[index].subcategories.push(e.target.value);
            setAllSubCategories(newAllSubCategories);
            e.target.value = '';
        }
    }

    const startFunction = () => {
        if(!props.addcategory) {
            const id = new URLSearchParams(props.location.search).get('id'); 
            props.getCategory(id);
            props.getAllCategoryIcons()
        }
        if(props.addcategory) {
            props.clearState();
            props.getAllCategoryIcons();
        }
    }

    return (
        <div className='AdminProfile row'>
            {props.category.failedMessage && <ResponseMessages message={props.category.failedMessage} ClassName="Danger" />}
            {props.category.successMessage && <ResponseMessages message={props.category.successMessage} />}
            <div className='col-12 mb-30'>
                {props.category.loading ? 
                <div className="card bg-white">
                    <div className="card-body">
                        <SmallSpinner />
                    </div>
                </div> :
                <div className="Card card text-white">
                    <div className="card-header">
                        {props.addcategory && <h4>Add Category</h4>}
                        {props.editcategory && <h4>Edit Category</h4>}
                        {props.viewcategory && <h4>{catName} Category</h4>}
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="row">
                                <LoginRegisterInputs formBox="col-md-6" label="Category Name" type="text" name="catName"
                                    placeholder="Enter Category Name" inputClass='form-control' invalidInput='invalid' invalidFeedback='invalid-feedback' value={catName} onChange={e => setCatName(e.target.value)}
                                    error={catNameError ? catNameError : ''} disabled={props.viewcategory}/>
                                {(iconName && props.viewcategory) && 
                                <div className='col-md-6'>
                                    <label className="d-block mb-10">Category Icon</label>
                                    <img width="48" height="48" src={iconName} alt={iconName} />
                                </div>}
                                {!props.viewcategory && 
                                <div className={classes.ICONS + " col-12 mt-20 mb-20"}>
                                    <label className="d-block mb-10">Select Icon for Category</label>
                                    {props.allIcons && props.allIcons.map(icon => 
                                    <label key={icon._id} className={classes.radioLabel}>
                                        <input type="radio" name="icon" value={icon.name} onChange={e => setIconName(e.target.value)} checked={icon.name === iconName ? true : false}/>
                                        <img src={icon.name} alt={icon._id} />
                                    </label>
                                    )}
                                </div>}
                            </div>
                            {(props.addcategory || props.editcategory) && <div className="row">
                                <LoginRegisterInputs formBox="col-md-6" label=" Sub Category Name" type="text" name="subCatName"
                                    placeholder="Enter Sub Category Name" inputClass='form-control' invalidInput='invalid' invalidFeedback='invalid-feedback' value={subCatName} onChange={e => setSubCatName(e.target.value)} error={subCatNameError ? subCatNameError : ''} disabled={props.viewcategory}/>
                                <div className="col-md-6">
                                    <label className="text-white">Enter Subcategories</label>
                                    <TagsInput2 choosenValues={subCategories} setChoosenValues={setSubCategories} disabled={props.viewcategory}/>
                                </div>
                                {(subCatName.length > 4 && subCategories.length > 0) && <button type="button" className="btn btn-sm mt-20" style={{ marginLeft: '1rem' }} onClick={addSubCategory}>Add Subcategory</button>}
                            </div>}
                            {allSubCategories.length > 0 && 
                            <div className="row mb-20">
                                {allSubCategories.map((cat, catIndex) => {
                                    return (
                                        <div className="col-md-6 mt-20" key={catIndex}>
                                            <p className={classes.P}>Subcategory Name: {cat.name} {!props.viewcategory && <i onClick={() => deleteSubCategory(catIndex)} className="fas fa-times"></i>}</p>
                                            <label>Subcategories</label>
                                            <ul className={classes.UL}>
                                                {cat.subcategories.map((sub, index) => <li key={index}>{sub} {!props.viewcategory && <i onClick={() => deleteTagSubcategory(catIndex, index)} className="fas fa-times"></i>}</li>)}
                                            </ul>
                                            <label className="mt-20">Add subcategory</label>
                                            <LoginRegisterInputs type="text" name={catIndex} placeholder="Add another subcategory" inputClass='form-control' invalidInput='invalid' invalidFeedback='invalid-feedback' onKeyDown={(e) => onInputKeyDown(e, catIndex)} error={inputErrors[catIndex] ? inputErrors[catIndex] : ''} disabled={props.viewcategory}/>
                                        </div>
                                    );
                                })}
                            </div>}
                            {props.addcategory && <button type="button" className="btn btn-sm mt-20" onClick={addCategory}>Add New Category</button>}
                            {props.editcategory && <button type="button" className="btn btn-sm mt-20" onClick={addCategory}>EditCategory</button>}
                        </form>
                    </div>
                </div>}
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        category: state.category,
        allIcons: state.categoryIcon.allCategoryIcons
    }
}

const dispatchMapToProps = dispatch => {
    return {
        addCategory: (data) => dispatch(actions.addCategory(data)),
        getCategory: (id) => dispatch(actions.getCategory(id)),
        editCategory: (id, data) => dispatch(actions.editCategory(id, data)),
        clearState: () => dispatch(actions.clearState()),
        getAllCategoryIcons: () => dispatch(actions.getAllCategoryIcons())
    }
}

export default connect(mapStateToProps, dispatchMapToProps)(AddCategory);