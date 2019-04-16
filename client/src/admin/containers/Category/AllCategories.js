import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import DataTable from '../../components/UI/DataTable/DataTable';
import SmallSpinner from '../../../users/components/UI/SmallSpinner/SmallSpinner';
import ResponseMessages from '../../../users/components/UI/ResponseMessages/ResponseMessages';

const AllCategories = props => {

    const [allCategories, setAllCategories] = useState([]);

    useEffect(() => {
        setAllCategories(props.categories);
        props.getAllCategories();
    }, []);

    useEffect(() => {
        setAllCategories(props.categories);
    }, [props.categories]);

    const deleteCategory = (e, id) => {
        e.preventDefault();
        props.deleteCategory(id);
    }

    return(
        <div className='AdminProfile row'>
            {props.failedMessage && <ResponseMessages ClassName="Danger" message={props.failedMessage} />}
            {props.successMessage && <ResponseMessages message={props.successMessage} />}
            <div className='col-12 mb-30'>
                {props.loading ? 
                <div className="Card card bg-white">
                    <div className="card-body">
                       <SmallSpinner />
                    </div>
                </div> :
                <div className={props.successMessage ? "Card card bg-white" : "Card card text-white"}>
                    <div className="card-header">
                        <h4>All Categories</h4>
                    </div>
                    <DataTable categoriesData={allCategories} click={deleteCategory}/>
                </div>}
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        categories: state.category.allCategories,
        loading: state.category.loading,
        failedMessage: state.category.failedMessage,
        successMessage: state.category.successMessage
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllCategories: () => dispatch(actions.getAllCategories()),
        deleteCategory: (id) => dispatch(actions.deleteCategory(id))
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(AllCategories);