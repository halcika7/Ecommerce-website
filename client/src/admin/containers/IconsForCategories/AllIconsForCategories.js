import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import DataTable from '../../components/UI/DataTable/DataTable';
import SmallSpinner from '../../../users/components/UI/SmallSpinner/SmallSpinner';
import ResponseMessages from '../../../users/components/UI/ResponseMessages/ResponseMessages';

const AdminAllCategories = props => {

    const [allCategoryIcons, setAllCategoryIcons] = useState([]);

    useEffect(() => {
        setAllCategoryIcons(props.icons);
        props.getAllCategoryIcons();
    }, []);

    useEffect(() => {
        setAllCategoryIcons(props.icons);
    }, [props.icons]);

    const deleteCategoryIcon = (e, id) => {
        e.preventDefault();
        props.deleteCategoryIcon(id);
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
                        <h4>All Category Icons</h4>
                    </div>
                    <DataTable iconsData={allCategoryIcons} click={deleteCategoryIcon}/>
                </div>}
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        icons: state.categoryIcon.allCategoryIcons,
        loading: state.categoryIcon.loading,
        successMessage: state.categoryIcon.successMessage,
        failedMessage: state.categoryIcon.failedMessage
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllCategoryIcons: () => dispatch(actions.getAllCategoryIcons()),
        deleteCategoryIcon: (id) => dispatch(actions.deleteCategoryIcon(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminAllCategories);